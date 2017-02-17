#Boilerplate LiTE

##Get Started

Note: You will need [NodeJS](https://nodejs.org/en/download/) and Gulp installed. 

_To install Gulp, please follow the instructions below under heading 'Installing Gulp'._

Then run commands:
```bash
npm install
npm run dev
```
_This will install all the required dependencies and run a testing server under [http://localhost:8080/](http://localhost:8080/)_


##Phpstorm Configuration

#####Setup ECMAScript 6 Environment
1. Go to
```Settings / Languages & Frameworks / Javascript / Javascript language version ```

2. Select ```ECMAscript 6``` from the drop-down menu, then click ```Apply```

#####Install EJS File Support
1. Go to
```Plugins / Install Jetbrains Plugin... ```

2. Select ```EJS``` plugin from the search results, then click ```Install``` from the description.


###Initial Framework Setup

####Installing Gulp

1. Check if gulp is installed (If it does not print a version, it is not installed).
    ```bash
    gulp -v
    ```

2. If not,
    ```bash
    npm install gulp-cli -g
    ```
3. Go to **step 1** to check if gulp has been successfully installed.




#####Install LFTP

1. Install Homebrew
```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2. Install LFTP via Homebrew (Make sure you have the latest XCode installed)
```bash
brew install homebrew/boneyard/lftp
```


####Quick Reference

#####SailsJS

Create a CRUD Entity e.g. 'message' -> 'MessageController',...
```bash
sails generate api [Entity Name]
```

####Important Notes

When using '.jsx' files within subdirectories in './src/js/', 
you will need to specify the file extension within the import URI. (e.g. import List from 'component/List.jsx').


##Misc.


####Setup SailsJS from scratch

Run these commands to install and generate an API example:
```bash
> sails generate new server
> cd server
> npm install
> sails generate api [Entity Name]
```
_[Entity Name] = The name of the entity to generate controllers and models for ('message' -> 'MessageController',...)_ 

Run the server using this command
```bash
> sails lift
```
