'use strict';

var app = angular.module('inventory', ['ngAnimate', 'ngSanitize', 'ng-bs3-datepicker', 'ui.bootstrap', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.exporter', 'ui.grid.selection', 'ui.grid.moveColumns']);
app.controller('reportCtrl',
['$scope','reportService', 'uiGridConstants', function ($scope, service, uiGridConstants) {
    controllerTemplate($scope, service);
    $scope.fxRate = 0.85;
    $scope.page = "reportInventory";
    $scope.columns = [
        { field: 'name'},
        { field: 'sellQty', displayName: 'Sell Qty', aggregationType: uiGridConstants.aggregationTypes.sum},
        { field: 'unitIncome', displayName: 'Unit Income ($)'},
        { field: 'totalIncome', displayName: 'Total Income ($)', aggregationType: uiGridConstants.aggregationTypes.sum},
        { field: 'unitCost', displayName: 'Unit Cost (¥)'},
        { field: 'totalCost', displayName: 'Total Cost (¥)', aggregationType: uiGridConstants.aggregationTypes.sum},
        { field: 'unitPL', displayName: 'Unit P/L ($)'},
        { field: 'totalPL', displayName: 'Total P/L ($)', aggregationType: uiGridConstants.aggregationTypes.sum}
    ];

    $scope.gridOptions = {
        exporterMenuCsv: false,
        exporterMenuPdf: false,
        enableSorting: true,
        showColumnFooter: true,
        enableColumnResizing: true,
        exporterMenuCsv: false,
        exporterMenuSelectedData: false,
        exporterMenuVisibleData: false,
        exporterColumnScaleFactor: 9,
        appScopeProvider: $scope,
        enableGridMenu: true,
        columnDefs: $scope.columns,
        exporterHeaderFilterUseName: true,
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        },
        exporterFieldCallback: function (grid, row, col, value) {
          return grid.getCellDisplayValue(row, col);
        },
        exporterExcelCustomFormatters: function ( grid, workbook, docDefinition ) {
            var formatters = {};
            var stylesheet = workbook.getStyleSheet();
            var boldStyle = stylesheet.createFontStyle({
                size: 12, fontName: 'Calibri', bold: true
            });
            formatters['bold'] = stylesheet.createFormat({"font": boldStyle.id});
            Object.assign(docDefinition.styles , formatters);
            return docDefinition;
        },
        exporterExcelHeader: function (grid, workbook, sheet, docDefinition) {
            sheet.data.push([{ value: $scope.from + ' ~ ' + $scope.to , metadata: {style: docDefinition.styles['bold'].id}}]);
            sheet.data.push([{ value: "FX Rate ( RMB -> HKD ):" + $scope.fxRate , metadata: {style: docDefinition.styles['bold'].id}}]);
        }
    };

    $scope.$watchGroup(['entities', 'fxRate'], function() {
        var data = $scope.entities;
        var fxRate = $scope.fxRate;
        var calculatePL = function (income, cost){
            if(!fxRate){
                return 0;
            }
            return (income - cost * fxRate).toFixed(2);
        }
        if(data){
            for(var i in data){
                data[i].unitPL = calculatePL(data[i].unitIncome, data[i].unitCost);
                data[i].totalPL = calculatePL(data[i].totalIncome, data[i].totalCost);
            }
            $scope.gridOptions.data = data;
        }
        $scope.gridOptions.data = data;
    });

    $scope.$watchGroup(['from', 'to'], function() {
        $scope.gridOptions.exporterExcelFilename = 'InventoryReport(' + $scope.from + '~' + $scope.to + ').xlsx';
        $scope.gridOptions.exporterExcelSheetName = $scope.from + '~' + $scope.to;
    });

    $scope.search = function (from, to) {
        service.search(from, to).then(function success(response) {
            $scope.entities = response.data;
        },
        function error (response) {
            $scope.setErrorMessage('Error getting!');
        });

    }

}]
);

app.service('reportService', ['$http', function($http) {
     this.search = function(from, to){
         return $http({
             method : 'GET',
             url : '/report/inventories?from='+from +'&to='+to
         });
     }
 } ]);

