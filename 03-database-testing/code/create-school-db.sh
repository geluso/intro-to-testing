mkdir school-db
cd school-db
npm install --save pg sequelize
createdb school
sequelize init

vim config/config.json
sequelize model:create --name grade --attributes name:text,grade:integer
sequelize db:migrate
