# UI to 0p3nr3p0
* * *

###[Visit version v3.0alpha](http://www.0p3nr3p0.net/index.html)

_Currently_ 0P3NR3P0 uses the older version of the couchapp tool._



# Howto (Roll your own):

##**Recommended**: use `virtualenv`

Use `virtualenv` and install `couchapp` with `pip install -r
requirementx.txt`

###Howto use Virtualenv:

1. Install `virtualenv` with `pip`:
    
        pip install virtualenv

2. Use `virtualenv` to use a local version of `couchapp` _this will work concurrently if you also have the nodejs `couchapp` installed_

        virtualenv venv --distribute
        
3. Activate the newly created `venv`

        source ./venv/bin/activate

4. Use `pip` to install `couchapp` with the `requirements.txt`

        pip install -r requirements.txt
5. You can now follow [Push changes to couchDB](#push-changes-to-couchdb)

## (not using `venv`): Install [`pip`](http://pypi.python.org/pypi/pip)

    sudo easy_install pip

## Use `pip` to install [`couchapp`](http://couchapp.org)

    pip install couchapp


## Push changes to couchDB

    couchapp push  https://USER:PASS@127.0.0.1:5984/openrepo

Then open the URL that it prints, which should be something like:

    2014-01-07 11:42:11 [INFO] Visit your CouchApp here:
    http://localhost:5984/openrepo/_design/0P3NR3P0/index.html

