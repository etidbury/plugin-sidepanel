#!/usr/bin/env bash


    if [ ! -d ".lftp.BACKUP" ]; then #if not dir exists
        mkdir .lftp.BACKUP
        cp ~/.lftp .lftp.BACKUP
    fi
    cp .lftp/rc ~/.lftp/