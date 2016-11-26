#Vueport Example

This is a bare bones application which uses the [Vueport gem](https://github.com/samtgarson/vueport/) to work with Vue JS components in a Rails application.

##Setup

```shell
git clone https://github.com/samtgarson/vueport-example.git

cd vueport-example

bundle install
yarn install # or npm install if you have to

foreman start
```

Then open `locahost:5000` and you should see our basic greeting.

##Steps up to now

1. Created a new Rails app including a single route, controller and view for our home page
2. Clear out the unecessary Railsy assets stuff as we're using shiny Webpack
3. Ran `rails g vueport:install`
4. Created our Vue component, `greeting` and added it to the home page
5. Done 👌

_Note:_
You might notice I use [yarn](https://yarnpkg.com/) to install our JS dependencies, rather than NPM. In my experience yarn is not only faster, but importantly also provides us with a lockfile which has already proved it's worth.
