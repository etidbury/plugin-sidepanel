#!/usr/bin/env bash

cd "bin/"
source "_config.sh"
cd "../"
source ${SETTINGS_URI}

sh "bin/git-ftp.sh" "init"


echo $2

if [[ $1 == "snapshot" ]]; then




    #git checkout -B ${MASTER_BRANCH}

    git checkout -B ${BACKUP_BRANCH}



    echo ${COLOR_ACTION}
    lftp -e "rm -rf /${FTP_PATH}/.git-ftp.log; bye" -u $FTP_USERNAME,$FTP_PASSWORD $FTP_HOST
    echo $NC

    mkdir -p "./_remote_backup"


    timest=$(date +"%Y-%m-%d_%H-%M-%S")

    backupURI="./_remote_backup/${timest}"
    backupGitURI=${backupURI}/.git

    rm -rf ${backupURI}

    mkdir -p ${backupURI}


    echo "${COLOR_ACTION}Connecting to FTP '${FTP_URL}'...$NC"

    echo "${COLOR_ACTION}"
    sh "bin/git-ftp.sh" "snapshot" "${FTP_URL}" "${backupURI}"
    echo "${NC}"

    rm -rf ${backupGitURI} #remove unwanted git repo which turns backup to submodule

    git add --all

    git commit -m "[bot] Created backup of Remote as of ${timest}"


    git checkout -B ${MASTER_BRANCH}


else

    sh bin/git-ftp.sh $1

fi


echo $NC
# Upload all files

# Or if the files are already there
#sh ${GIT_FTP_SH_URI} catchup


