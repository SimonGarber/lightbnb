select reservations.*,properties.*, avg(property_reviews.rating) as average_rating 
from reservations

join properties on reservations.property_id = properties.id
join property_reviews on properties.id = property_reviews.property_id
where end_date < now() and reservations.guest_id = 1
group by reservations.id,properties.id
order by reservations.start_date DESC
limit 10;