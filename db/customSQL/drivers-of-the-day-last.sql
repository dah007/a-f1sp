-- f1sp.`drivers-of-the-day-last-race` source

create or replace
algorithm = UNDEFINED view `drivers-of-the-day-last-race` (`race_id`,
`position_display_order`,
`position_number`,
`position_text`,
`driver_number`,
`driver_id`,
`constructor_id`,
`engine_manufacturer_id`,
`tyre_manufacturer_id`,
`percentage`) as
select
    `driver_of_the_day_result`.`race_id` as `race_id`,
    `driver_of_the_day_result`.`position_display_order` as `position_display_order`,
    `driver_of_the_day_result`.`position_number` as `position_number`,
    `driver_of_the_day_result`.`position_text` as `position_text`,
    `driver_of_the_day_result`.`driver_number` as `driver_number`,
    `driver_of_the_day_result`.`driver_id` as `driver_id`,
    `driver_of_the_day_result`.`constructor_id` as `constructor_id`,
    `driver_of_the_day_result`.`engine_manufacturer_id` as `engine_manufacturer_id`,
    `driver_of_the_day_result`.`tyre_manufacturer_id` as `tyre_manufacturer_id`,
    `driver_of_the_day_result`.`percentage` as `percentage`
from
    `driver_of_the_day_result`
order by
    `driver_of_the_day_result`.`race_id` desc,
    `driver_of_the_day_result`.`percentage` desc
limit 5;