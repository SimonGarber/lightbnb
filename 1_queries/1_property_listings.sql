select * from (select properties.*,avg(rating) as average_rating 
from properties
join property_reviews on property_reviews.property_id = properties.id
group by properties.id
order by cost_per_night asc) as stuff
where stuff.average_rating >= 4
limit 10;

-- SELECT properties.*, avg(property_reviews.rating) as average_rating
-- FROM properties
-- JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%'
-- GROUP BY properties.id
-- HAVING avg(property_reviews.rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 10;