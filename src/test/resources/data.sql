INSERT INTO inventory (create_time, update_time, name, price, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory1', 100, 20, 'i1' );
INSERT INTO purchase (create_time, update_time, purchase_date, drawee, inventory_id, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kiwi', 'i1', 5, 'purchase11' );
INSERT INTO purchase (create_time, update_time, purchase_date, drawee, inventory_id, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Jessie','i1', 10, 'purchase12' );

INSERT INTO inventory (create_time, update_time, name, price, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory2', 10, 3, 'i2' );
INSERT INTO purchase (create_time, update_time, purchase_date, drawee, inventory_id, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kiwi', 'i2', 3, 'purchase21' );

INSERT INTO inventory (create_time, update_time, name, price, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory3', 3, 1.5, 'i3' );
INSERT INTO purchase (create_time, update_time, purchase_date, drawee, inventory_id, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Jessie', 'i3', 10, 'purchase31' );

INSERT INTO inventory (create_time, update_time, name, price, cost, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory4', 3, 1.5, 'i4' );
INSERT INTO purchase (create_time, update_time, purchase_date, drawee, inventory_id, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Kiwi','i4', 20, 'purchase41' );


INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id)
values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer1', 'address 1', '11111111',STRINGDECODE('customer1\n1111 1111\naddress 1'),'Facebook','BOC - Kiwi', null, 12, 118, '(Inventory1) 100 * 1 (Inventory2) 10 * 3 - 12 = 118', 'PREPARING', 'o1' );
INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id)
values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer2', 'address 2', '22222222',STRINGDECODE('customer2\n22222222\naddress 2'), 'WhatsApp','Payme - Jessie',CURRENT_TIMESTAMP, null, null, null, 'PREPARING','o2' );
INSERT INTO order_item (create_time, update_time, inventory_id, quantity, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 1, 99, 'o1', 'item11' );
INSERT INTO order_item (create_time, update_time, inventory_id, quantity, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 3, 'o1', 'item12' );


INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, status, id)
values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer3', 'address 3', '33333333',STRINGDECODE('customer3\n33333333\naddress 3'),'Facebook','BOC - Kiwi', CURRENT_TIMESTAMP, 12, 118, STRINGDECODE('(Inventory1) $100 * 1 +\n (Inventory2) $10 * 3 \n = $130 - $12\n= $118'), 'PENDING_DELIVERY', 'o3' );
INSERT INTO order_item (create_time, update_time, inventory_id, quantity, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 1, 100, 'o3', 'item31' );
INSERT INTO order_item (create_time, update_time, inventory_id, quantity, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 10, 'o3', 'item32' );

INSERT INTO orders (create_time, update_time, customer, address, tel, content, source, payment_method, payment_date, discount, total_billing, calculator, shipping_fee_actual, delivery_date, delivery_drawee, waybill_number, status, id)
values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer4', 'address 4', '44444444',STRINGDECODE('customer4\n10001000\naddress 4'), 'WhatsApp','Payme - Jessie',CURRENT_TIMESTAMP, 3, 297, STRINGDECODE('(Inventory1) $100 * 3\n = $300 - $3\n= $297'), 25, CURRENT_TIMESTAMP, 'Kiwi', '02321344222', 'COMPLETED','o4' );
INSERT INTO order_item (create_time, update_time, inventory_id, quantity, price, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 3, 100, 'o4', 'item42' );
