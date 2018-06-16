INSERT INTO inventory (create_time, update_time, name, cost, price, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory1', 25, 100, 10, 'i1' );
INSERT INTO inventory (create_time, update_time, name, cost, price, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory2', 2.5, 10, 100, 'i2' );
INSERT INTO inventory (create_time, update_time, name, cost, price, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory3', 3, 3, 3, 'i3' );
INSERT INTO inventory (create_time, update_time, name, cost, price, quantity, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Inventory4', 3, 3, 3, 'i4' );


INSERT INTO orders (create_time, update_time, customer, address, tel, content, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer1', 'address 1', '51110000',STRINGDECODE('customer1\naddress 1\n5111 0000'), 'o1' );
INSERT INTO orders (create_time, update_time, customer, address, tel, content, id) values (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'customer2', 'address 2', '32221111',STRINGDECODE('customer2\naddress 2\n32221111'), 'o2' );

INSERT INTO order_item (create_time, update_time, inventory_id, volume, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i1', 1, 'o1', 'item11' );
INSERT INTO order_item (create_time, update_time, inventory_id, volume, order_id, id) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'i2', 3, 'o1', 'item12' );
