INSERT INTO inventory (create_time, update_time, name, cost, price, init_quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory1', 25, 100, 20 , 'i1' );
INSERT INTO inventory (create_time, update_time, name, cost, price, init_quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory2', 2.5, 10, 100, 'i2' );
INSERT INTO inventory (create_time, update_time, name, cost, price, init_quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory3', 3, 3, 10, 'i3' );
INSERT INTO inventory (create_time, update_time, name, cost, price, init_quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory4', 3, 3, 10, 'i4' );


INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer1', 'address 1', '51110000',STRINGDECODE('customer1\n5111 0000\naddress 1'),'Facebook','BOC - Kiwi', null, 12, 118, '(Inventory1) 100 * 1 (Inventory2) 10 * 3 - 12 = 118', 'o1' );
INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer2', 'address 2', '32221111',STRINGDECODE('customer2\n32221111\naddress 2'), 'WhatsApp','Payme - Jessie','2018-07-24', null, null, null, 'o2' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 1, 'o1', 'item11' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 'o1', 'item12' );
