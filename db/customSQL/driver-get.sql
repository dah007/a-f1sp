-- f1sp.`driver-get` source

create or replace
algorithm = UNDEFINED view `driver-get` as
select
    `c`.`alpha2_code` as `alpha2_code`,
    upper(date_format(`d`.`date_of_birth`, '%d-%b-%Y')) as `formatted_dob`,
    `d`.`date_of_death` as `date_of_death`,
    `d`.`first_name` as `first_name`,
    `d`.`full_name` as `full_name`,
    `d`.`id` as `id`,
    `d`.`last_name` as `last_name`,
    `d`.`abbreviation` as `abbreviation`,
    `d`.`place_of_birth` as `place_of_birth`,
    `d`.`country_of_birth_country_id` as `country_of_birth_country_id`
from
    (`driver` `d`
join `country` `c` on
    ((`d`.`country_of_birth_country_id` = `c`.`id`)))
order by
    `d`.`abbreviation`;