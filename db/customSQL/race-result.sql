-- f1sp.`race-result` source
create or replace
algorithm = UNDEFINED view `race-result` as
select
    concat(`race_result`.`race_id`, '-', `race_result`.`driver_id`) as `pKey`,
    `race_result`.`race_id` as `race_id`,
    `race_result`.`position_display_order` as `position_display_order`,
    `race_result`.`position_number` as `position_number`,
    `race_result`.`position_text` as `position_text`,
    `race_result`.`driver_number` as `driver_number`,
    `race_result`.`driver_id` as `driver_id`,
    `race_result`.`constructor_id` as `constructor_id`,
    `race_result`.`engine_manufacturer_id` as `engine_manufacturer_id`,
    `race_result`.`tyre_manufacturer_id` as `tyre_manufacturer_id`,
    `race_result`.`shared_car` as `shared_car`,
    `race_result`.`laps` as `laps`,
    `race_result`.`time` as `time`,
    `race_result`.`time_millis` as `time_millis`,
    `race_result`.`time_penalty` as `time_penalty`,
    `race_result`.`time_penalty_millis` as `time_penalty_millis`,
    `race_result`.`gap` as `gap`,
    `race_result`.`gap_millis` as `gap_millis`,
    `race_result`.`gap_laps` as `gap_laps`,
    `race_result`.`interval` as `interval`,
    `race_result`.`interval_millis` as `interval_millis`,
    `race_result`.`reason_retired` as `reason_retired`,
    `race_result`.`points` as `points`,
    `race_result`.`pole_position` as `pole_position`,
    `race_result`.`qualification_position_number` as `qualification_position_number`,
    `race_result`.`qualification_position_text` as `qualification_position_text`,
    `race_result`.`grid_position_number` as `grid_position_number`,
    `race_result`.`grid_position_text` as `grid_position_text`,
    `race_result`.`positions_gained` as `positions_gained`,
    `race_result`.`pit_stops` as `pit_stops`,
    `race_result`.`fastest_lap` as `fastest_lap`,
    `race_result`.`driver_of_the_day` as `driver_of_the_day`,
    `race_result`.`grand_slam` as `grand_slam`
from
    `race_result`;