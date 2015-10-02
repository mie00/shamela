#installation

1. mdb-tools src/odbc/odbc.c

    change `len - stmt->pos` to `len - stmt->pos + 1`

2. install mdb-tools

    ```bash
    ./configure --with-unixodbc=/usr/local
    make
    make install
    ```

4. add this to /etc/odbcinst.ini

    ```
    [MDB]
	Description     = MDB tools odbc
	Driver      = libmdbodbc.so
	setup       = libmdbodbc.so
	Driver64    = libmdbodbc.so
	Setup64     = libmdbodbc.so
	FileUsage   = 1
	```

3. npm install
4. node_modules/odbc/lib/odbc.js

    comment this `//moreResults = result.moreResultsSync();`

    add this `moreResults = false;`

5. node_modules/odbc/binding.gyp

    comment this `#        'UNICODE'`

6. npm install at odbc
    
