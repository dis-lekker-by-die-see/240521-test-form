let entryCount = 0;
let events = {};

function generateTimestamp() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}-${hours}${minutes}`;
}

function loadEventCSV() {
    const lines = csvData仮日程.split('\n');
    lines.forEach(line => {
        const [scheduleNumber,scheduleDate,eventNumber,category,eventCode,
            eventName,eventDescription,priceCode,price] = line.split(',');
        /*const [scheduleNumber, eventName] = line.split(',');
        */
        if (scheduleDate && scheduleNumber && eventName) {
            events[scheduleNumber.trim()] = scheduleDate.trim() + ' : ' + eventName.trim();
        }
    });
    console.log('Events loaded:', events); // For debugging purposes
}

// function numberToChar(number) {
//     return 'm'.repeat(number);
// }

// // Display in the HTML element
// document.getElementById('starOutput').textContent = numberToChar(3);

//=============================================================================================================================
//                            Club

document.getElementById('addClubButton').addEventListener('click', function() {
    const ridingClubContainer = document.getElementById('ridingClubContainer');
    const lastClub = ridingClubContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-club');

    if (lastClub) {
        const inputs = lastClub.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled

                // Display the input value below the input box
                const displaySpanClass = input.className + 'Display';
                let displaySpan = input.parentNode.querySelector('.' + displaySpanClass);
                
                if (!displaySpan) {
                    displaySpan = document.createElement('span');
                    displaySpan.className = displaySpanClass;
                    input.parentNode.appendChild(displaySpan);
                }
                displaySpan.textContent = input.value;
            }
        });
        
        if (!allFilled) {
            errorMessage.textContent = 'すべての必須項目にご記入ください。';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
        return;
    }

    const clubDiv = document.createElement('div');
    clubDiv.className = 'club';
    clubDiv.innerHTML = `
        <div>
            <label for="ridingClub">団体名:</label>
            <input type="text" class="clubName" required>
            <span class="clubNameDisplay"></span>
        </div>
        <div>
            <label for="registrationOfficer">申込責任者:</label>
            <input type="text" class="registrationOfficer" required>
            <span class="registrationOfficerDisplay"></span>
        </div>
        <div>
            <label for="mobile">携帯:</label>
            <input type="text" class="mobile" required>
            <span class="mobileDisplay"></span>
        </div>
        <div>
            <label for="phone">電話:</label>
            <input type="text" class="phone" required>
            <span class="phoneDisplay"></span>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" class="email" required>
            <span class="emailDisplay"></span>
        </div>
        <div>
            <label for="fax">FAX:</label>
            <input type="text" class="fax" required>
            <span class="faxDisplay"></span>
        </div>
        <div>
            <label for="address">住所:</label>
            <input type="text" class="address" required>
            <span class="addressDisplay"></span>
        </div>
    `;
    ridingClubContainer.appendChild(clubDiv);

    const inputs = clubDiv.querySelectorAll('input');

    inputs.forEach(input => {
        const displaySpanClass = input.className + 'Display';
        const displaySpan = clubDiv.querySelector('.' + displaySpanClass);

        input.addEventListener('input', function() {
            displaySpan.textContent = input.value;
        });
    });
});

//=============================================================================================================================
//                            Team

document.getElementById('addTeamButton').addEventListener('click', function() {
    const teamContainer = document.getElementById('teamContainer');
    const lastTeam = teamContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-team');
    

    if (lastTeam) {
        const inputs = lastTeam.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another team.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }

    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';
    const teamNumber = document.querySelectorAll('.team').length + 1;

    let charDisplayId = 'teamNumberCharDisplay' + (teamNumber - 1);
    const teamNumberCharDisplay = document.getElementById(charDisplayId);
    teamNumberCharDisplay.textContent = 'E'.repeat(teamNumber - 1);
    charDisplayId = 'teamNumberCharDisplay' + (teamNumber);
    
    teamDiv.innerHTML = `
        <div class="teamNumberLine">
            <div class="teamNumber">${teamNumber}</div>
            <div id="${charDisplayId}" class="teamNumberChar">_</div>
        </div>
        <div class="team-fields">
            <div>
                <label for="teamName">所属名:</label>
                <input type="text" class="teamName" required>
            </div>
        </div>
    `;
    teamContainer.appendChild(teamDiv);
    updateSelectOptions();
});


//=============================================================================================================================
//                            Horse

document.getElementById('addHorseButton').addEventListener('click', function() {
    const horseContainer = document.getElementById('horseContainer');
    const lastHorse = horseContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-horse');

    if (lastHorse) {
        const inputs = lastHorse.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        // if (!allFilled) {
        //     alert('Please fill in all required fields before adding another horse.');
        //     return;
        // }
        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another horse.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }

    const horseDiv = document.createElement('div');
    horseDiv.className = 'horse';
    const horseNumber = document.querySelectorAll('.horse').length + 1;

    let charDisplayId = 'horseNumberCharDisplay' + (horseNumber - 1);
    const horseNumberCharDisplay = document.getElementById(charDisplayId);
    horseNumberCharDisplay.textContent = 'Y'.repeat(horseNumber - 1);
    charDisplayId = 'horseNumberCharDisplay' + (horseNumber);

    horseDiv.innerHTML = `
        <div class="horseNumberLine">
            <div class="horseNumber">${horseNumber}</div>
            <div id="${charDisplayId}" class="horseNumberChar">_</div>
        </div>
        <div class="horse-fields">
            <div>
                <label for="horseName">馬名:</label>
                <input type="text" class="horseName" required>
            </div>
            <div>
                <label for="horseNameFurigana">フリガナ:</label>
                <input type="text" class="horseNameFurigana" required>
            </div>
            <div>
                <label for="horseRegNumber">登録番号:</label>
                <input type="text" class="horseRegNumber" required>
            </div>
            <div>
                <label for="horseSex">性別:</label>
                <select class="horseSex" required>
                    <option value="" disabled selected>性別</option>
                    <option value="セン">セン</option>
                    <option value="牝">牝</option>
                    <option value="牡">牡</option>
                </select>
            </div>
            <div>
                <label for="horseAge">年齢:</label>
                <input type="text" class="horseAge" required>
            </div>
            <div>
                <label for="horseColor">毛色:</label>
                <select class="horseColor" required>
                    <option value="" disabled selected>毛色</option>
                    <option value="鹿毛">鹿毛</option>
                    <option value="黒鹿毛">黒鹿毛</option>
                    <option value="栗毛">栗毛</option>
                    <option value="芦毛">芦毛</option>
                    <option value="栃栗毛">栃栗毛</option>
                    <option value="青鹿毛">青鹿毛</option>
                    <option value="青毛">青毛</option>
                    <option value="粕毛">粕毛</option>
                    <option value="ブチ">ブチ</option>
                </select>
            </div>
            <div>
                <label for="horseBreed">品種:</label>
                <input type="text" class="horseBreed" required>
            </div>
            <div>
                <label for="horseOrigin">産地:</label>
                <input type="text" class="horseOrigin" required>
            </div>
            <div>
                <label for="horseOwner">所有者:</label>
                <input type="text" class="horseOwner" required>
            </div>
        </div>
    `;
    horseContainer.appendChild(horseDiv);
    updateSelectOptions();
});

//=============================================================================================================================
//                            Rider

document.getElementById('addRiderButton').addEventListener('click', function() {
    const riderContainer = document.getElementById('riderContainer');
    const lastRider = riderContainer.lastElementChild;
    const errorMessage = document.getElementById('error-message-rider');

    if (lastRider) {
        const inputs = lastRider.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another rider.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }

    const riderDiv = document.createElement('div');
    riderDiv.className = 'rider';
    const riderNumber = document.querySelectorAll('.rider').length + 1;

    let charDisplayId = 'riderNumberCharDisplay' + (riderNumber - 1);
    const riderNumberCharDisplay = document.getElementById(charDisplayId);
    riderNumberCharDisplay.textContent = 'V'.repeat(riderNumber - 1);
    charDisplayId = 'riderNumberCharDisplay' + (riderNumber);

    riderDiv.innerHTML = `
        <div class="riderNumberLine">
            <div class="riderNumber">${riderNumber}</div>
            <div id="${charDisplayId}" class="riderNumberChar">_</div>
        </div>
        <div class="rider-fields">
            <div>
                <label for="riderName">選手名:</label>
                <input type="text" class="riderName" required>
            </div>
            <div>
                <label for="riderNameFurigana">フリガナ:</label>
                <input type="text" class="riderNameFurigana" required>
            </div>
            <div>
                <label for="riderRegNumber">登録番号:</label>
                <input type="text" class="riderRegNumber" required>
            </div>
            <div>
                <label for="riderSex">性別:</label>
                <select class="riderSex" required>
                    <option value="" disabled selected>性別</option>
                    <option value="男子">男子</option>
                    <option value="女子">女子</option>
                </select>
            </div>
        </div>
    `;
    riderContainer.appendChild(riderDiv);
    updateSelectOptions();
});

//=============================================================================================================================
//                            Entries

document.getElementById('addEntryButton').addEventListener('click', function() {
    const eventForm = document.getElementById('eventForm');
    const entryContainer = eventForm.querySelector('.entry-container');
    const lastEntry = entryContainer ? entryContainer.lastElementChild : null;
    const errorMessage = document.getElementById('error-message-entry');

    if (lastEntry) {
        const inputs = lastEntry.querySelectorAll('input[required], select[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = 'red'; // Highlight the empty fields
            } else {
                input.style.borderColor = ''; // Reset the border color if filled
            }
        });

        // if (!allFilled) {
        //     alert('Please fill in all required fields before adding another entry.');
        //     return;
        // }
        if (!allFilled) {
            errorMessage.textContent = 'Please fill in all required fields before adding another entry.';
            errorMessage.style.display = 'block';
            return;
        } else {
            errorMessage.style.display = 'none';
        }
    }

    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';
    const entryNumber = document.querySelectorAll('.entry').length + 1;

    let charDisplayId = 'entryNumberCharDisplay' + (entryNumber - 1);
    const entryNumberCharDisplay = document.getElementById(charDisplayId);
    entryNumberCharDisplay.textContent = 'C'.repeat(entryNumber - 1);
    charDisplayId = 'entryNumberCharDisplay' + (entryNumber);

    entryDiv.innerHTML = `
        <div class="entryNumberLine">
            <div class="entryNumber">${entryNumber}</div>
            <div id="${charDisplayId}" class="entryNumberChar">_</div>
        </div>
        <div class="entry-fields">




        <div>
        <label for="teamSelect">所属:</label>
        <select class="teamSelect" required></select>
    </div>
    <div>
        <label for="scheduleNumber">競技番号:</label>
        <input type="number" class="scheduleNumber" min="1" max="999" required>
        <span class="eventName"></span>
    </div>
    
    <div>
        <label for="riderSelect">選手名:</label>
        <select class="riderSelect" required></select>
    </div>
    
    <div>
        <label for="horseSelect">Horse:</label>
        <select class="horseSelect" required></select>
    </div>




        </div>
    `;
    
    // Ensure the entry container exists
    if (!entryContainer) {
        const newEntryContainer = document.createElement('div');
        newEntryContainer.className = 'entry-container';
        eventForm.appendChild(newEntryContainer);
        newEntryContainer.appendChild(entryDiv);
    } else {
        entryContainer.appendChild(entryDiv);
    }

    updateSelectOptions();
});


//=============================================================================================================================
//                            Data Arrays

document.getElementById('submitEntriesButton').addEventListener('click', function() {

    /*let csv = 'horseName,horseNameFurigana,horseRegNumber,'
    +'horseSex,horseAge,horseColor,horseBreed,horseOrigin,horseOwner\n';
    */
    const horses = Array.from(document.querySelectorAll('.horse')).map(horse => ({
        name: horse.querySelector('.horseName').value,
        furigana: horse.querySelector('.horseNameFurigana').value,
        regNumber: horse.querySelector('.horseRegNumber').value,
        sex: horse.querySelector('.horseSex').value,
        age: horse.querySelector('.horseAge').value,
        color: horse.querySelector('.horseColor').value,
        breed: horse.querySelector('.horseBreed').value,
        origin: horse.querySelector('.horseOrigin').value,
        owner: horse.querySelector('.horseOwner').value
    }));

    /*csv += '\nriderName,riderNameFurigana,riderRegNumber,riderSex\n';
    */
    const riders = Array.from(document.querySelectorAll('.rider')).map(rider => ({
        name: rider.querySelector('.riderName').value,
        furigana: rider.querySelector('.riderNameFurigana').value,
        regNumber: rider.querySelector('.riderRegNumber').value,
        sex: rider.querySelector('.riderSex').value
    }));

    const entries = Array.from(document.querySelectorAll('.entry')).map(entry => ({
        teamName: entry.querySelector('.teamSelect').textContent,
        number: entry.querySelector('.entryNumber').textContent,
        rider: entry.querySelector('.riderSelect').value,
        scheduleNumber: entry.querySelector('.scheduleNumber').value,
        eventName: entry.querySelector('.eventName').textContent,
        horse: entry.querySelector('.horseSelect').value
    }));

    const horsesAndRidersCSV = generateHorsesAndRidersCSV(horses, riders);
    const entriesCSV = generateEntriesCSV(entries);

    downloadCSV(horsesAndRidersCSV, 'horses_and_riders.csv');
    downloadCSV(entriesCSV, 'entries.csv');
});

//=============================================================================================================================
//                            /

function updateSelectOptions() {
    const teamNames = Array.from(document.querySelectorAll('.teamName')).map(input => input.value);
    const riderNames = Array.from(document.querySelectorAll('.riderName')).map(input => input.value);
    const horseNames = Array.from(document.querySelectorAll('.horseName')).map(input => input.value);

    const teamSelects = document.querySelectorAll('.teamSelect');
    teamSelects.forEach(select => {
        const selectedValue = select.value;
        select.innerHTML = '';
        teamNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.value = selectedValue;
    });
    
    const riderSelects = document.querySelectorAll('.riderSelect');
    riderSelects.forEach(select => {
        const selectedValue = select.value;
        select.innerHTML = '';
        riderNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.value = selectedValue;
    });

    const horseSelects = document.querySelectorAll('.horseSelect');
    horseSelects.forEach(select => {
        const selectedValue = select.value;
        select.innerHTML = '';
        horseNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        });
        select.value = selectedValue;
    });

    const scheduleNumbers = document.querySelectorAll('.scheduleNumber');
    scheduleNumbers.forEach(input => {
        input.addEventListener('input', function() {
            const eventNameSpan = this.nextElementSibling;
            const scheduleNumber = this.value;
            if (events[scheduleNumber]) {
                eventNameSpan.textContent = events[scheduleNumber];
            } else {
                eventNameSpan.textContent = 'Event not found';
            }
        });
    });
}

//=============================================================================================================================
//                            Generate .csv Entry File

function generateHorsesAndRidersCSV(horses, riders) {

    let csv = 'Club\n';

    
    
    
    csv += '\nhorseName,horseNameFurigana,horseRegNumber,'
    +'horseSex,horseAge,horseColor,horseBreed,horseOrigin,horseOwner\n';
    horses.forEach(horse => {
        csv += `${horse.name},${horse.furigana},${horse.regNumber},
        ${horse.sex},${horse.age},${horse.color},${horse.breed},
        ${horse.origin},${horse.owner}\n`;
    });

    csv += '\nriderName,riderNameFurigana,riderRegNumber,riderSex\n';
    riders.forEach(rider => {
        csv += `${rider.name},${rider.age},${rider.experience}\n`;
    });

    csv += '\nFees\n';

    return csv;
}

function generateEntriesCSV(entries) {
    //団体名,フリガナ	選手名	登録番号	性別
    let csv = 'Entrant Number,Rider,Event Number,Event Name,Horse\n';
    entries.forEach(entry => {
        csv += `${entry.number},${entry.rider},${entry.scheduleNumber},${entry.eventName},${entry.horse}\n`;
    });

    return csv;
}

function downloadCSV(csvContent, filename) {
    const timestamp = generateTimestamp();
    const fullFilename = `${filename}-${timestamp}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = fullFilename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

//=============================================================================================================================
//=============================================================================================================================
//                            csv inline data


const csvData仮日程 = 
`scheduleNumber,scheduleDate,eventNumber,category,eventCode,eventName,eventDescription,priceCode,price
1,2024-05-16,17,2,FS120,フレンドシップ120,H120㎝以下  経路自由選択　スタート後70秒間走行許可,フレンドシップ,7000
2,2024-05-16,16,2,FS100,フレンドシップ100,H100㎝以下  経路自由選択　スタート後70秒間走行許可,フレンドシップ,7000
3,2024-05-16,18,2,FS80,フレンドシップ80,H80㎝以下  経路自由選択　スタート後70秒間走行許可,フレンドシップ,7000
4,2024-05-17,33,2,中D-K,中障害飛越競技Ｄ(公認),JEF 中障害D  A-238-2.1　H110㎝以下 W130㎝以下,公認,12000
5,2024-05-17,32,2,中D-I,中障害飛越競技Ｄ(一般),JEF 中障害D  A-238-2.1　H110㎝以下 W130㎝以下,一般,7000
6,2024-05-17,31,2,中C-K,中障害飛越競技Ｃ(公認),JEF 中障害C  A-238-2.1　H120㎝以下 W140㎝以下 ,公認,12000
7,2024-05-17,30,2,中C-I,中障害飛越競技Ｃ(一般),JEF 中障害C  A-238-2.1　H120㎝以下 W140㎝以下 ,一般,7000
8,2024-05-17,29,2,中B-K,中障害飛越競技Ｂ(公認),JEF 中障害B  A-238-2.1　H130㎝以下 W150㎝以下,公認,12000
9,2024-05-17,28,2,中B-I,中障害飛越競技Ｂ(一般),JEF 中障害B  A-238-2.1　H130㎝以下 W150㎝以下,一般,7000
10,2024-05-17,36,2,小80,小障害飛越競技80,JEF 小障害C  A-238-2.1  H80㎝以下　W90㎝以下,一般,7000
11,2024-05-17,37,2,小90,小障害飛越競技90,JEF 小障害B  A-238-2.1  H90㎝以下  W100cm以下,一般,7000
12,2024-05-17,34,2,小100,小障害飛越競技100,JEF 小障害A  A-238-2.1  H100㎝以下 W110㎝以下 ,一般,7000
13,2024-05-18,19,1,GP,グランプリ馬場馬術競技,FEI グランプリ馬場馬術課目(2022更新版）,一般,7000
14,2024-05-18,22,1,JrR,ジュニアライダー馬場馬術競技,FEI ジュニアライダー個人競技馬場馬術課目(2022更新版）,一般,7000
15,2024-05-18,20,1,Int-I,インターメディエイトⅠ馬場馬術競技(一般),FEI インターメディエイトⅠ馬場馬術課目(2022更新版）,一般,7000
16,2024-05-18,13,1,5A-K,馬場馬術５A(公認),JEF 馬場馬術競技第５課目A,公認,12000
17,2024-05-18,12,1,5A-I,馬場馬術５A(一般),JEF 馬場馬術競技第５課目A,一般,7000
18,2024-05-18,24,1,St-K,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(公認),FEI セントジョージ賞典馬場馬術課目(2022更新版）,公認,12000
19,2024-05-18,23,1,St-I,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(一般),FEI セントジョージ賞典馬場馬術課目(2022更新版）,一般,7000
20,2024-05-18,9,1,4A-K,馬場馬術４A(公認),JEF 馬場馬術競技第４課目A,公認,12000
21,2024-05-18,8,1,4A-I,馬場馬術４A(一般),JEF 馬場馬術競技第４課目A,一般,7000
22,2024-05-18,5,1,3A-K,馬場馬術３A(公認),JEF 馬場馬術競技第３課目A,公認,12000
23,2024-05-18,4,1,3A-I,馬場馬術３A(一般),JEF 馬場馬術競技第３課目A,一般,7000
24,2024-05-18,25,1,YngR-K,ヤングライダー馬場馬術競技(公認）,FEI ヤングライダー個人競技馬場馬術課目(2022更新版）,公認,12000
25,2024-05-18,2,1,2B,馬場馬術２B,JEF 馬場馬術競技第２課目B,一般,7000
26,2024-05-18,3,1,2C,馬場馬術２C,JEF 馬場馬術競技第２課目C,一般,7000
27,2024-05-18,38,1,選択自由,選択自由演技馬場馬術競技,選手が希望する自由演技課目（注）,一般,7000
28,2024-05-18,39,1,選択馬場,選択馬場馬術課目,選手が希望する課目（注）(20×60m、20×40mのどちらでも可）,一般,7000
29,2024-05-18,40,1,パラ,パラ馬術競技,選手が希望する課目（注）,一般,7000
30,2024-05-18,26,2,ｸﾛｽ,クロス障害,クロス障害通過　分速325ｍ（基準タイム制）,クロス,5000
31,2024-05-18,35,2,小70,小障害飛越競技70,H70㎝以下（垂直のみ）分速325ｍ（基準タイム制）,一般,7000
32,2024-05-18,36,2,小80,小障害飛越競技80,JEF 小障害C  A-238-2.1  H80㎝以下　W90㎝以下,一般,7000
33,2024-05-18,37,2,小90,小障害飛越競技90,JEF 小障害B  A-238-2.1  H90㎝以下  W100cm以下,一般,7000
34,2024-05-18,34,2,小100,小障害飛越競技100,JEF 小障害A  A-238-2.1  H100㎝以下 W110㎝以下 ,一般,7000
35,2024-05-18,33,2,中D-K,中障害飛越競技Ｄ(公認),JEF 中障害D  A-238-2.1　H110㎝以下 W130㎝以下,公認,12000
36,2024-05-18,32,2,中D-I,中障害飛越競技Ｄ(一般),JEF 中障害D  A-238-2.1　H110㎝以下 W130㎝以下,一般,7000
37,2024-05-18,31,2,中C-K,中障害飛越競技Ｃ(公認),JEF 中障害C  A-238-2.1　H120㎝以下 W140㎝以下 ,公認,12000
38,2024-05-18,30,2,中C-I,中障害飛越競技Ｃ(一般),JEF 中障害C  A-238-2.1　H120㎝以下 W140㎝以下 ,一般,7000
39,2024-05-18,29,2,中B-K,中障害飛越競技Ｂ(公認),JEF 中障害B  A-238-2.1　H130㎝以下 W150㎝以下,公認,12000
40,2024-05-18,28,2,中B-I,中障害飛越競技Ｂ(一般),JEF 中障害B  A-238-2.1　H130㎝以下 W150㎝以下,一般,7000
41,2024-05-18,27,2,ｼﾞﾑｶｰﾅ,ジムカーナ競技,横木通過,ジムカーナ,5000
42,2024-05-19,19,1,GP,グランプリ馬場馬術競技,FEI グランプリ馬場馬術課目(2022更新版）,一般,7000
43,2024-05-19,22,1,JrR,ジュニアライダー馬場馬術競技,FEI ジュニアライダー個人競技馬場馬術課目(2022更新版）,一般,7000
44,2024-05-19,21,1,Int-K,インターメディエイトⅠ馬場馬術競技(公認),FEI　インターメディエイトⅠ馬場馬術課目(2022更新版）,公認,12000
45,2024-05-19,20,1,Int-I,インターメディエイトⅠ馬場馬術競技(一般),FEI インターメディエイトⅠ馬場馬術課目(2022更新版）,一般,7000
46,2024-05-19,15,1,5B-K,馬場馬術５B(公認),JEF 馬場馬術競技第５課目B,公認,12000
47,2024-05-19,14,1,5B-I,馬場馬術５B(一般),JEF 馬場馬術競技第５課目B,一般,7000
48,2024-05-19,24,1,St-K,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(公認),FEI セントジョージ賞典馬場馬術課目(2022更新版）,公認,12000
49,2024-05-19,23,1,St-I,ｾﾝﾄｼﾞｮｰｼﾞ賞典馬場馬術競技(一般),FEI セントジョージ賞典馬場馬術課目(2022更新版）,一般,7000
50,2024-05-19,11,1,4B-K,馬場馬術４B(公認),JEF 馬場馬術競技第４課目B,公認,12000
51,2024-05-19,10,1,4B-I,馬場馬術４B(一般),JEF 馬場馬術競技第４課目B,一般,7000
52,2024-05-19,7,1,3B-K,馬場馬術３B(公認),JEF 馬場馬術競技第３課目B,公認,12000
53,2024-05-19,6,1,3B-I,馬場馬術３B(一般),JEF 馬場馬術競技第３課目B,一般,7000
54,2024-05-19,25,1,YngR-K,ヤングライダー馬場馬術競技(公認）,FEI ヤングライダー個人競技馬場馬術課目(2022更新版）,公認,12000
55,2024-05-19,2,1,2B,馬場馬術２B,JEF 馬場馬術競技第２課目B,一般,7000
56,2024-05-19,3,1,2C,馬場馬術２C,JEF 馬場馬術競技第２課目C,一般,7000
57,2024-05-19,38,1,選択自由,選択自由演技馬場馬術競技,選手が希望する自由演技課目（注）,一般,7000
58,2024-05-19,39,1,選択馬場,選択馬場馬術課目,選手が希望する課目（注）(20×60m、20×40mのどちらでも可）,一般,7000
59,2024-05-19,40,1,パラ,パラ馬術競技,選手が希望する課目（注）,一般,7000
60,2024-05-19,33,2,中D-K,中障害飛越競技Ｄ(公認),JEF 中障害D  A-238-2.1　H110㎝以下 W130㎝以下,公認,12000
61,2024-05-19,32,2,中D-I,中障害飛越競技Ｄ(一般),JEF 中障害D  A-238-2.1　H110㎝以下 W130㎝以下,一般,7000
62,2024-05-19,31,2,中C-K,中障害飛越競技Ｃ(公認),JEF 中障害C  A-238-2.1　H120㎝以下 W140㎝以下 ,公認,12000
63,2024-05-19,30,2,中C-I,中障害飛越競技Ｃ(一般),JEF 中障害C  A-238-2.1　H120㎝以下 W140㎝以下 ,一般,7000
64,2024-05-19,29,2,中B-K,中障害飛越競技Ｂ(公認),JEF 中障害B  A-238-2.1　H130㎝以下 W150㎝以下,公認,12000
65,2024-05-19,28,2,中B-I,中障害飛越競技Ｂ(一般),JEF 中障害B  A-238-2.1　H130㎝以下 W150㎝以下,一般,7000
66,2024-05-19,26,2,ｸﾛｽ,クロス障害,クロス障害通過　分速325ｍ（基準タイム制）,クロス,5000
67,2024-05-19,35,2,小70,小障害飛越競技70,H70㎝以下（垂直のみ）分速325ｍ（基準タイム制）,一般,7000
68,2024-05-19,36,2,小80,小障害飛越競技80,JEF 小障害C  A-238-2.1  H80㎝以下　W90㎝以下,一般,7000
69,2024-05-19,37,2,小90,小障害飛越競技90,JEF 小障害B  A-238-2.1  H90㎝以下  W100cm以下,一般,7000
70,2024-05-19,34,2,小100,小障害飛越競技100,JEF 小障害A  A-238-2.1  H100㎝以下 W110㎝以下 ,一般,7000
71,2024-05-19,27,2,ｼﾞﾑｶｰﾅ,ジムカーナ競技,横木通過,ジムカーナ,5000`;







// Load event data on page load
loadEventCSV();
updateSelectOptions();





