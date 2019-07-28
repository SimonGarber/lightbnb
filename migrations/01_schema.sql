-- drop table 
-- users,
-- properties,
-- reservations,
-- property_reviews;

create table users (
    id serial primary key not null,
    name text not null,
    email text not null,
    password text not null
);

create table properties (
    id serial primary key not null,
    owner_id integer references users(id) on delete cascade,
    title text not null,
    description text not null,
    thumbnail_photo_url text not null,
    cover_photo_url text not null,
    cost_per_night integer not null,
    street text not null,
    parking_spaces integer,
    number_of_bathrooms integer,
    number_of_bedrooms integer,
    country text not null,
    city text not null,
    province text not null,
    post_code text not null, 
    active boolean 
 );

create table reservations (
    id serial primary key not null,
    start_date date not null,
    end_date date not null,
    property_id integer references properties(id) on delete cascade,
    guest_id integer references users(id) on delete cascade
 );

create table property_reviews (
    id serial primary key not null,
    guest_id integer references users(id) on delete cascade,
    reservation_id integer references reservations(id) on delete cascade,
    property_id integer references properties(id) on delete cascade,
    rating integer,
    message text
);


