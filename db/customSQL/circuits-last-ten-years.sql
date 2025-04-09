-- f1sp.`circuits-last-ten-years` source

create or replace
algorithm = UNDEFINED view `circuits-last-ten-years` as with `latestrace` as (
select
    `r`.`circuit_id` as `circuit_id`,
    max(`r`.`date`) as `latest_date`
from
    `race` `r`
where
    ((`r`.`year` <= (
    select
        date_format(now(), '%Y')))
        and (`r`.`year` >= (
        select
            date_format((now() - interval 10 year), '%Y'))))
group by
    `r`.`circuit_id`)
select
    `c`.`place_name` as `place_name`,
    `c`.`id` as `id`,
    `r`.`date` as `date`,
    date_format(`r`.`date`, '%e-%b-%y') as `raceDate`,
    `r`.`official_name` as `official_name`,
    `c`.`name` as `shortName`,
    `c`.`full_name` as `full_name`,
    `c`.`type` as `circuitType`,
    `cc`.`name` as `country`,
    `c`.`latitude` as `latitude`,
    `c`.`longitude` as `longitude`
from
    (((`circuit` `c`
left join `race` `r` on
    ((`c`.`id` = `r`.`circuit_id`)))
join `country` `cc` on
    ((`c`.`country_id` = `cc`.`id`)))
join `latestrace` `lr` on
    (((`r`.`circuit_id` = `lr`.`circuit_id`) and (`r`.`date` = `lr`.`latest_date`))))
order by
    `c`.`place_name`,
    `r`.`date` desc;