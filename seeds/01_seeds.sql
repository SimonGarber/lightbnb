-- insert into users (name,email,password)
-- values ('Robert Johnson','rjohnson@example.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
--        ('Mark Burnett','mburnett@survivor.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
--        ('Bill Preston','bill@bnt.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

-- insert into properties (owner_id,title,descriptions,thumbnail_photo_url,cover_photo_url,cost_per_night,street,parking_spaces,number_of_bathrooms,country,city,province,post_code,active)
-- values (1,'house on the hill','description','www.houses.com/house_on_the_hill/tn','www.houses.com/house_on_the_hill/cover',100,'1st street',1,1,'canada','toronto','ontario','m3n4e2',true),
--        (2,'party house','description','www.houses.com/party_house/tn','www.houses.com/party_house/cover',85,'2nd street',1,2,'canada','toronto','ontario','l5y3e7',true),
--        (3,'the study station','description','www.houses.com/study_station/tn','www.houses.com/study_station/cover',70,'3rd street',0,1,'canada','north york','ontario','m4t7u8',true);

-- insert into reservations (property_id,guest_id,start_date,end_date)
-- values (1,1,'2019-01-01','2019-01-03'),
--        (2,2,'2019-02-01','2019-02-07'),
--        (3,3,'2019-04-02','2019-04-10');

insert into property_reviews (guest_id,reservation_id,property_id,rating,messages)
values (1,1,1,4,'message'),
       (2,2,2,2,'message'),
       (3,3,3,5,'message');
