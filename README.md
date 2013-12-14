# UI to 0p3nr3p0
* * *

###[Visit version v3.0alpha](http://www.0p3nr3p0.net/index.html)

_Currently_ 0P3NR3P0 uses the older version of the couchapp tool._

####**Recommended**: use `virtualenv`

Use `virtualenv` and install `couchapp` with `pip install -r
requirementx.txt`

#####Howto use Virtualenv:
1. Install `virtualenv` with `pip`:
	
		pip install virtualenv

2. Use `virtualenv` to use a local version of `couchapp` _this will work concurrently if you also have the nodejs `couchapp` installed_

		virtualenv venv --distribute
		
3. Activate the newly created `venv`

		source ./venv/bin/activate

4. Use `pip` to install `couchapp` with the `requirements.txt`

		pip install -r requirements.txt
5. You can now follow [Push changes to couchDB](#push-changes-to-couchdb)


# Howto (Roll your own):
## Install [`pip`](http://pypi.python.org/pypi/pip)

    sudo easy_install pip

## Use `pip` to install [`couchapp`](http://couchapp.org)

    pip install couchapp


## <a name="usecouchapp"></a>Push changes to couchDB

  couchapp push  https://USER:PASS@127.0.0.1:5984/openrepo

Then open the URL that it prints
