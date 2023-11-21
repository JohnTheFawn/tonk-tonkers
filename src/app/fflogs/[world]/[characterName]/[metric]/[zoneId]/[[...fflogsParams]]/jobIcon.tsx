
import Image from 'next/image'

const JOB_TO_ICON_MAP: Record<string, string> = {
    'astrologian': '/icons/jobs/astrologian.png',
    'bard': '/icons/jobs/bard.png',
    'blackmage': '/icons/jobs/black-mage.png',
    'bluemage': '/icons/jobs/blue-mage.png',
    'dancer': '/icons/jobs/dancer.png',
    'darkknight': '/icons/jobs/dark-knight.png',
    'dragoon': '/icons/jobs/dragoon.png',
    'gunbreaker': '/icons/jobs/gunbreaker.png',
    'machinist': '/icons/jobs/machinist.png',
    'monk': '/icons/jobs/monk.png',
    'ninja': '/icons/jobs/ninja.png',
    'paladin': '/icons/jobs/paladin.png',
    'reaper': '/icons/jobs/reaper.png',
    'redmage': '/icons/jobs/red-mage.png',
    'sage': '/icons/jobs/sage.png',
    'samurai': '/icons/jobs/samurai.png',
    'scholar': '/icons/jobs/scholar.png',
    'summoner': '/icons/jobs/summoner.png',
    'warrior': '/icons/jobs/warrior.png',
    'whitemage': '/icons/jobs/white-mage.png'
};

function getJobIconPath(jobName: string){
    // convert to lowercase
    let parsedJobName = jobName.toLowerCase();
    // remove spaces
    parsedJobName = parsedJobName.replace(/ /g, '');
    return JOB_TO_ICON_MAP[parsedJobName];
}

export default function JobIcon({ jobName }: {jobName: string}){
    return (
        <Image
            src={getJobIconPath(jobName)}
            className={`verticalAlignMiddle`}
            alt={`${jobName} icon`}
            width={20} height={20}
        />
    );
}