INSERT INTO companies (
    company_name,
    email,
    password,
    contact_number,
    category
)
VALUES (
           'LemonInc',
           'lemoninc@email.com',
           'password1',
           82349823,
           'Electronics'
       ),
       (
           'PotatoMan',
           'PotatoMan@email.com',
           'password12',
           94659873,
           'Food'
       ),
       (
           'Cucumber Foot Reflexology',
           'cucumber@email.com',
           'password123',
           96382737,
           'Beauty & Wellness'
       ),
       (
           'MANGOsTeen',
           'mangosteen@email.com',
           'password1234',
           88832434,
           'Fashion'
       ),
	(
           'ValueCents',
           'ValueCents@email.com',
           'password1234',
           88888888,
           'Others'
       );

do $$
    declare
        lon numeric := 103.63;
        lat numeric := 1.26;
        counter integer := 100;
        hours varchar := '8 am to 8 pm daily';
	randomstore varchar := '';
    begin
        lon := 103.63;
        while lon < 103.99 loop
            lat := 1.26;
            while lat < 1.47 loop
                    SELECT company_name FROM companies ORDER BY RANDOM() LIMIT 1 INTO randomstore;
                    INSERT INTO stores (
                        company_name,
                        longitude,
                        latitude,
                        address,
                        opening_hours
                    )
                    VALUES (
                               randomstore,
                               lon + random() * 0.006 - 0.003,
                               lat + random() * 0.006 - 0.003,
                               randomstore || ' Road ' || counter,
                               hours
                           );
                lat := lat + 0.007;
                counter := counter + 1;
            end loop;
            lon := lon + 0.006;
        end loop;
    end$$;

INSERT INTO promotions (
    company_name,
    promo_name,
    end_date,
    details
)
VALUES (
           'LemonInc',
           '20% off all products',
           '2021-12-31',
           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Nibh sit amet commodo nulla facilisi nullam. Dictum varius duis at consectetur lorem donec massa. Neque vitae tempus quam pellentesque. Consectetur adipiscing elit duis tristique sollicitudin nibh. Sed enim ut sem viverra. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. In ornare quam viverra orci sagittis eu volutpat odio. Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Morbi enim nunc faucibus a. Est ultricies integer quis auctor elit sed vulputate.'
       ),
       (
           'PotatoMan',
           'Free potato with any purchase.',
           '2021-11-01',
           'Tristique senectus et netus et malesuada. Accumsan lacus vel facilisis volutpat est velit. Pellentesque dignissim enim sit amet venenatis urna. Aliquam nulla facilisi cras fermentum odio eu feugiat. Scelerisque viverra mauris in aliquam sem fringilla. Cursus in hac habitasse platea dictumst quisque sagittis purus. Mauris augue neque gravida in fermentum et sollicitudin ac. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Molestie nunc non blandit massa enim. Interdum consectetur libero id faucibus nisl tincidunt eget. Mattis nunc sed blandit libero volutpat sed cras. Duis ut diam quam nulla porttitor massa. Sed vulputate mi sit amet mauris commodo quis imperdiet. Ridiculus mus mauris vitae ultricies leo integer malesuada. At tellus at urna condimentum mattis pellentesque. Morbi tincidunt augue interdum velit euismod.'
       ),
       (
           'Cucumber Foot Reflexology',
           '35% off all packages!',
           '2021-10-15',
           'Leo a diam sollicitudin tempor id eu nisl nunc. Viverra nibh cras pulvinar mattis nunc. Dictum varius duis at consectetur lorem donec massa. Orci eu lobortis elementum nibh tellus molestie. Turpis nunc eget lorem dolor sed viverra ipsum nunc. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Senectus et netus et malesuada fames ac turpis. Vivamus arcu felis bibendum ut tristique et egestas quis ipsum. Semper risus in hendrerit gravida rutrum quisque non. Consectetur adipiscing elit duis tristique sollicitudin. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Pellentesque pulvinar pellentesque habitant morbi. Adipiscing tristique risus nec feugiat in fermentum posuere. Donec enim diam vulputate ut pharetra sit amet aliquam. Sit amet justo donec enim.'
       ),
	(
           'Cucumber Foot Reflexology',
           '$10 fish spa',
           '2021-10-21',
           'Eu augue ut lectus arcu bibendum at varius. Varius morbi enim nunc faucibus a. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Habitasse platea dictumst quisque sagittis. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. In hendrerit gravida rutrum quisque non tellus orci. Molestie a iaculis at erat pellentesque. Mauris pharetra et ultrices neque ornare aenean. Auctor elit sed vulputate mi sit amet mauris commodo quis. Nisi scelerisque eu ultrices vitae auctor eu. Eget magna fermentum iaculis eu non. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Lectus proin nibh nisl condimentum id venenatis a. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In hac habitasse platea dictumst quisque sagittis purus sit amet. Nunc sed blandit libero volutpat sed cras ornare. Adipiscing commodo elit at imperdiet dui. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum.'
       ),
       (
           'MANGOsTeen',
           'Mystery free gift!',
           '2021-12-12',
           'Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Enim nunc faucibus a pellentesque. Id interdum velit laoreet id. At risus viverra adipiscing at in tellus integer. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Feugiat nibh sed pulvinar proin. Nunc non blandit massa enim nec dui nunc. Est ultricies integer quis auctor elit sed vulputate mi. Purus in mollis nunc sed id. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Sed enim ut sem viverra aliquet. Sit amet est placerat in egestas erat imperdiet sed euismod. Eget nulla facilisi etiam dignissim. Velit laoreet id donec ultrices tincidunt arcu non.'
       ),
       (
           'ValueCents',
           'Closing down sale',
           '2023-06-24',
           'Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Aliquet eget sit amet tellus cras. Volutpat odio facilisis mauris sit. Arcu non odio euismod lacinia at quis risus sed vulputate. Sit amet mauris commodo quis imperdiet massa. Non curabitur gravida arcu ac. Nunc mattis enim ut tellus elementum sagittis vitae. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Ut diam quam nulla porttitor massa id neque aliquam vestibulum. Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Quam pellentesque nec nam aliquam sem et tortor consequat. Urna duis convallis convallis tellus id interdum velit. Consequat semper viverra nam libero justo laoreet sit amet cursus. Tincidunt dui ut ornare lectus sit.'
       );


INSERT INTO promotion_store (promotion_id, store_id)
SELECT p.promotion_id, s.store_id FROM promotions p, stores s WHERE p.company_name = s.company_name;

INSERT INTO company_logos (
    filename,
    filepath,
    mimetype
)
VALUES (
           'LemonInc',
           'images/Lemon',
           'image/png'
       ),
       (
           'PotatoMan',
           'images/Potato',
           'image/png'
       ),
       (
           'Cucumber Foot Reflexology',
           'images/Cucumber',
           'image/png'
       ),
       (
           'MANGOsTeen',
           'images/Mangosteen',
           'image/png'
       ),
       (
           'ValueCents',
           'images/Cents',
           'image/png'
       );

INSERT INTO promotion_pictures (
    promotion_id,
    filename,
    filepath,
    mimetype
)
VALUES (
            1,
            'Promo1',
           'images/Promo1',
           'image/png'
       ),
       (
            2,
            'Promo2',
            'images/Promo2',
            'image/png'
       ),
       (
            3,
            'Promo3',
            'images/Promo3',
            'image/png'
       ),
       (
            4,
            'Promo4',
            'images/Promo4',
            'image/png'
       ),
       (
            5,
            'Promo5',
            'images/Promo5',
            'image/png'
       ),
       (
            6,
            'Promo6',
            'images/Promo6',
            'image/png'
       );
