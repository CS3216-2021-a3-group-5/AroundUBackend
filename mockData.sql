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
           'MANGOsTeen',
           'mangosteen@email.com',
           'password123',
           88832434,
           'Fashion'
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
           'MANGOsTeen',
           'Mystery free gift!',
           '2021-12-12',
           'Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Enim nunc faucibus a pellentesque. Id interdum velit laoreet id. At risus viverra adipiscing at in tellus integer. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Feugiat nibh sed pulvinar proin. Nunc non blandit massa enim nec dui nunc. Est ultricies integer quis auctor elit sed vulputate mi. Purus in mollis nunc sed id. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Sed enim ut sem viverra aliquet. Sit amet est placerat in egestas erat imperdiet sed euismod. Eget nulla facilisi etiam dignissim. Velit laoreet id donec ultrices tincidunt arcu non.'
       );

do $$
    declare
        promo_id integer := 1;
        store_id integer := 1;
    begin
        while store_id < 1700 loop
            INSERT INTO promotion_store (promotion_id, store_id)
            VALUES (promo_id, store_id);
            promo_id := promo_id + 1;
            store_id := store_id + 1;
            if promo_id > 3 then
                promo_id := 1;
            end if;
        end loop;
    end$$;

INSERT INTO company_logos (
    filename,
    filepath,
    mimetype
)
VALUES (
           'LemonInc',
           'images\Company 1',
           'image/jpeg'
       ),
       (
           'PotatoMan',
           'images\Company 2',
           'image/jpeg'
       ),
       (
           'MANGOsTeen',
           'images\Company 3',
           'image/jpeg'
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
           'images\Promo1',
           'image/jpeg'
       ),
       (
            2,
            'Promo2',
            'images\Promo2',
            'image/jpeg'
       ),
       (
            3,
            'Promo3',
            'images\Promo3',
            'image/jpeg'
       );
