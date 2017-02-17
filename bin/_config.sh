#!/usr/bin/env bash

if [ ! ${SETUP_ROOT_URI} ]; then

    COLOR_ACTION='\033[1;34m'
    COLOR_ACTION_SUB='\033[34m'
    COLOR_QUESTION='\033[1;33m'
    COLOR_NOTICE=${COLOR_ACTION_SUB}
    COLOR_WARNING='\033[32m'
    NC='\033[0m' #NO COLOR


    SETUP_ROOT_URI="/"

    SETUP_BIN_URI="bin/"
    PROJECT_ROOT_URI="./"

    SETTINGS_URI=${SETUP_BIN_URI}".settings"

    BACKUP_BRANCH='bot-backup-remote'
    MASTER_BRANCH='master'

fi

