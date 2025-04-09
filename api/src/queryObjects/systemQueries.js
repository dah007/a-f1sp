const checkLogin = ({
    name,
    pin
}) => (`
    SELECT * 
    FROM user
    WHERE name = '${name}'
    AND pin = '${pin}';
`);

module.exports = { checkLogin };
