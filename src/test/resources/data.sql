INSERT INTO inventory (create_time, update_time, name, price, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory1', 100 , 'i1' );
INSERT INTO purchase (create_time, update_time, purchase_date, inventory_id, quantity, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 5, 25, 'purchase11' );
INSERT INTO purchase (create_time, update_time, purchase_date, inventory_id, quantity, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 10, 27.5, 'purchase12' );

INSERT INTO inventory (create_time, update_time, name, price, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory2', 10, 'i2' );
INSERT INTO purchase (create_time, update_time, purchase_date, inventory_id, quantity, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 2, 'purchase21' );

INSERT INTO inventory (create_time, update_time, name, price, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory3', 3, 'i3' );
INSERT INTO purchase (create_time, update_time, purchase_date, inventory_id, quantity, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i3', 10, 1, 'purchase31' );

INSERT INTO inventory (create_time, update_time, name, price, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory4', 3, 'i4' );
INSERT INTO purchase (create_time, update_time, purchase_date, inventory_id, quantity, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i4', 20, 2, 'purchase41' );


INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer1', 'address 1', '51110000',STRINGDECODE('customer1\n5111 0000\naddress 1'),'Facebook','BOC - Kiwi', null, 12, 118, '(Inventory1) 100 * 1 (Inventory2) 10 * 3 - 12 = 118', 'PREPARING', 'o1' );
INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer2', 'address 2', '32221111',STRINGDECODE('customer2\n32221111\naddress 2'), 'WhatsApp','Payme - Jessie','2018-07-24', null, null, null, 'PREPARING','o2' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 1, 99, 'o1', 'item11' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 3, 'o1', 'item12' );


INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer1', 'address 1', '51110000',STRINGDECODE('customer1\n5111 0000\naddress 1'),'Facebook','BOC - Kiwi', null, 12, 118, '(Inventory1) 100 * 1 (Inventory2) 10 * 3 - 12 = 118', 'PENDING_DELIVERY', 'o3' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 1, 100, 'o3', 'item31' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 10, 'o3', 'item32' );

INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer2', 'address 2', '32221111',STRINGDECODE('customer2\n32221111\naddress 2'), 'WhatsApp','Payme - Jessie','2018-07-24', null, null, null, 'COMPLETED','o4' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 3, 10, 'o4', 'item42' );
