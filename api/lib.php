<?php
//error_reporting(E_ERROR | E_PARSE);

header("Access-Control-Allow-Origin: *");
define("DB_TYPE","mysql");
define("DB_HOST","127.0.0.1");
define("DB_NAME","wmg_vantquiz_db");
define("DB_USER",'root');
define("DB_PWD",'');


class DB extends PDO {

    public function __construct() {
        parent::__construct(DB_TYPE.':host='.DB_HOST.';charset=utf8;dbname='.DB_NAME, DB_USER, DB_PWD);
    }

    public function prepare($stmt,$options=array()) {

        return parent::prepare($stmt,$options);

    }


}


function json($data=array(),$code=200) {

    $d=$data;
    $d['code']=$code;
    header('Content-Type: application/json');
    //set headers to NOT cache a page
    header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
    header("Pragma: no-cache"); //HTTP 1.0
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
    http_response_code($code);

    echo json_encode($d);
    exit();

}

