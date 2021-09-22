INSERT INTO companies (
    company_name,
    email,
    password,
    contact_number,
    category
)
VALUES (
           'Company 1',
           'Company1@email.com',
           'password1',
           11111111,
           'Electronics'
       ),
       (
           'Company 2',
           'Company12@email.com',
           'password12',
           11111111,
           'Food'
       ),
       (
           'Company 3',
           'Company123@email.com',
           'password123',
           11111111,
           'Fashion'
       );

do $$
    declare
        lon numeric := 103.63;
        lat numeric := 1.26;
        counter integer := 100;
        company_counter integer := 1;
        hours varchar := '8 am to 8 pm daily';
    begin
        lon := 103.63;
        while lon < 103.99 loop
            raise notice 'The current value of the latitude is %', lat;
            lat := 1.26;
            raise notice 'The current value of the latitude is %', lat;
            while lat < 1.47 loop
                    INSERT INTO stores (
                        company_name,
                        longitude,
                        latitude,
                        address,
                        opening_hours
                    )
                    VALUES (
                               'Company ' || company_counter,
                               lon,
                               lat,
                               'address road ' || counter,
                               hours
                           );
                lat := lat + 0.007;
                counter := counter + 1;
                company_counter := company_counter + 1;
                    if company_counter > 3 then
                        company_counter := 1;
                    end if;
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
           'Company 1',
           'promo 1',
           '2021-12-12',
           '1 long description here'
       ),
       (
           'Company 2',
           'promo 2',
           '2021-12-12',
           '2 long description here'
       ),
       (
           'Company 3',
           'promo 3',
           '2021-12-12',
           '3 long description here'
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
