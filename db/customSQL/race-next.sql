-- f1sp.`race-next` source

create or replace
algorithm = UNDEFINED view `race-next` as
select
    `r`.`id` as `raceId`,
    `gp`.`short_name` as `short_name`,
    `r`.`year` as `year`,
    date_format(`r`.`date`, '%e-%b-%y') as `date`
from
    (`race` `r`
join `grand_prix` `gp` on
    ((`r`.`grand_prix_id` = `gp`.`id`)))
where
    (`r`.`date` > now())
order by
    `r`.`date`
limit 1;