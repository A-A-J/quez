//Call the data and include it as a variable
let dataCategory    = 'data/dataCategory.json',
    dataMembers     = 'data/dataMembers.json',
    dataSteps       = 'data/dataSteps.json',
    dataQuests      = 'data/dataQuests.json',

    //Create an ajax environment using xhr
    xhr             = new XMLHttpRequest(),

    //The following are the classes that are used frequently
    container       = document.getElementsByClassName('container')[1],
    formGroup       = document.getElementsByClassName('form-group')[0],
    errorSearch     = document.getElementsByClassName('errorSearch')[0],

    //include an array inside a variable
    numberToArray = [],
    
    arrayDataMember = [],

    language = {
        clickSteps  : 'أختر احد المراحل التالية، وعلمًا عندما تتقدم سيزيد مستوى الصعوبة!',
        theStep     : 'المرحلة',
        notSteps    : 'لاتوجد أي مرحلة حتى الآن!',
        start       : 'بدء',
        racer       : 'مُتحدي',
        MakeSureToAnswer    : 'تأكد من الإجابة على الاسئلة التالية علمًا بأنه سيتم إعلامك بالإجابات الغير صحيحة!',
        next        : 'التالي',
        viewResult  : 'مشاهدة النتيجة',
        backToSteps : '<i class="fa fa-home"></i> العودة إلى قائمة المراحل',
        notQuest    : 'لاتوجد أي اسئلة حتى الآن',
        plsClickAnswer  : 'قم بأختيار احد الاجابات التالية للإنطلاق إلى السؤال التالي!',
        goodEndStep : 'رائع لقد قمت بإنهاء المرحلة رقم (x2) بالنجاح ولقد حصلت على (x1) من النقاط!',
        viewErrors  : 'مراجعة الاخطاء',
    };

/*##########################################################################################################*/
    //page link call
    let url         = window.location.search;

    //Delete the entire link and include the number in the link only!
    let fillterUrl  = url.replace('?category=', '');

    // [1] => Checking whether the link is empty, the data for the home page is fetched,
    // [2] => and if it is not empty, the data for the selection of stages is fetched
    if(window.location.search != ''){

        //Recall data by fetch
        fetch(dataCategory)
        .then((response) => response.json())
        .then((jsonResponse) => {

            //Show data with the use of the for property, which enables me to know the index numbers
            for (i in jsonResponse) {

                //Check if the number in the page link is equal to the number in the category hands number
                if( jsonResponse[i]['id'] == fillterUrl){

                    //Create a div, and include the class and content of the div or element and show it on the page
                    let content = document.createElement('div');
                    content.classList.add('content');
                    content.innerHTML = `
                        <h2>${jsonResponse[i]['name']}</h2>
                        <div class="des">${language['clickSteps']}</div>
                        <div class="steps"></div>
                    `;
                    container.innerHTML = '';
                    container.appendChild(content);


                    //Recall data by fetch
                    fetch(dataSteps)
                    .then((response) => response.json())
                    .then((jsonResponse) => {

                        //Create a div with the name step , include the class and content of the div or element and display it on the page
                        let steps = document.querySelector('.steps');

                        ////Show data with the use of the for property, which enables me to know the index numbers
                        for( i in jsonResponse ){

                            //Check if the category ID is equal to the number in the page link
                            if( jsonResponse[i]['idCategory'] == fillterUrl ){

                                //Create a div, and include the class and content of the div or element and show it on the page
                                let div = document.createElement('div');
                                div.setAttribute('onclick', 'list(event)');
                                div.setAttribute('id', jsonResponse[i]['id']);
                                div.classList.add('item');
                                div.innerHTML = `${language['theStep']} ${jsonResponse[i]['name']}`;

                                //Show div content inside class .steps
                                steps.appendChild(div);
                            }
                        }

                        //Check if there is a steps or not
                        if( document.querySelector('.item') == null ){
                            let notData = document.createElement('div');
                            notData.classList.add('list', 'danger');
                            notData.style.marginBottom = '1rem';
                            notData.innerText = language['notSteps'];
                            
                            document.querySelector('.content').insertAdjacentElement('beforeend', notData);

                            //delete class steps
                            steps.remove();
                        }
                    });
                }
            }
        });
    }else{

        //Recall data by fetch
        fetch(dataCategory)
        .then((response) => response.json())
        .then((json) => {

            //Calling and displaying class data by for
            for (let index = 0; index < json.length; index++) {

                //Create a new dev
                let item = document.createElement('div');
                item.classList.add('item');
                item.id = 'item';

                //Include the name, description, icon, and number of participants within the created item
                item.innerHTML = `
                                    <div class="header">
                                        <a href="index.html?category=${json[index]['id']}">${language['start']}</a>
                                        <div class="icon">${json[index]['icon']}</div>
                                        <h4>${json[index]['name']}</h4>
                                        <small>${json[index]['des']}</small>
                                    </div>
                                    
                                    <div class="body">
                                        <ul>
                                            <li>
                                                <div class="icon">
                                                    <img src="assets/img/category/menu.svg"/>
                                                </div>
                                                <span>0/25</span>
                                            </li>
                                            
                                            <li>
                                                <div class="icon">
                                                    <img src="assets/img/category/users.svg"/>
                                                </div>
                                                <span><span id="countMembers" idCategory="${json[index]['id']}"><i class="fa fa-spinner fa-spin"></i></span> ${language['racer']}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    `;
                                    // <div class="footer">
                                    //     <ul>
                                    //         <li title="أحمد">أ</li>
                                    //         <li title="باسل">ب</li>
                                    //         <li title="جواد">ج</li>
                                    //         <li title="اظهار الكل">35+</li>
                                    //     </ul>
                                    // </div>

                //Delay in showing [item] with [setTimeout]
                setTimeout(() => {
                    document.querySelector('.row').insertAdjacentElement('afterbegin', item);
                    //When finished, delete the item
                    if( document.getElementById('itemLoad')){
                        //delete
                        document.getElementById('itemLoad').remove();
                    }
                },1000);
            }
        });

        //Fetching contestants' data using the [fetch] feature with the use of the wait or download feature [setTimeout]
        setTimeout(() => {
            fetch(dataMembers)
            .then((response) => response.json())
            .then((jsonResponse) => {
                //add variable
                let arr = [],
                    countMembers = document.querySelectorAll(' [idCategory] ');

                function getCountWinners(id){
                    for (let index = 0; index < jsonResponse.length; index++) {
                        if( jsonResponse[index]['idCategory'] == id ){
                            arr.push( jsonResponse[index]['idCategory'] );
                        }
                    }
                    return arr.length;
                }

                for (let index = 0; index < countMembers.length; index++) {
                    let idcategory = countMembers[index].getAttribute('idcategory');
                        document.querySelector(`[idCategory="${idcategory}"]`).innerHTML = getCountWinners(idcategory);
                }
            });
        }, 3000);

        // start system search item
        function searchItem() {
            let input, filter, item, td, txtValue,
                statusSearch = document.querySelector('.errorSearch');

            input = document.getElementById("searchCategory");
            filter = input.value.toUpperCase();
            item = document.querySelectorAll(".item");
            
            for (let index = 0; index < item.length; index++) {
                td = item[index].querySelector("h4");
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        statusSearch.style.display = 'none';
                        item[index].removeAttribute('style');
                    }else{
                        statusSearch.style.display = 'block';
                        item[index].style.display = "none";
                    }
                }
            }
        }
    }

    //create function list
    function list(event){
        //Use the stage number identifier or step
        let id  = event.target.getAttribute('id'),
            content = document.querySelector('.content'),
            steps   = document.querySelector('.steps');

        document.querySelector('.des').innerText = language['MakeSureToAnswer'];

        //Recall data by fetch
        fetch(dataQuests)
        .then((response) => response.json())
        .then((jsonResponse) => {

            //When displaying questions, hide all stages or steps data
            steps.style.display = 'none';

            //Call the ids and embed it inside the array
            for(i=1; i < jsonResponse.length; i++){
                numberToArray.push(jsonResponse[i]['id']);
            }

            let iii = 1;

            for(i=0; i < jsonResponse.length; i++){

                //Check if the question data includes a number similar to the specified stage number
                if( jsonResponse[i]['idSteps'] === id ){
                    let numb = iii++;

                    // create new div
                    let div = document.createElement('div')
                    div.classList.add("list");
                    div.setAttribute('id-button', jsonResponse[i]['id']);
                    div.setAttribute('idAnswer', jsonResponse[i]['IdCorrectAnswer']);
                    div.innerHTML = `<div class="question">${numb} - ${jsonResponse[i]['question']} <span style="float: left;"><span class="sunQuez">0</span>/${numb}</span> </div>`;

                    //Include a div inside content
                    content.insertAdjacentElement('beforeend', div)

                    // create new div Grid
                    let grid = document.createElement('div');
                    grid.classList.add('row');
                    
                    
                    //get the answer data using the for
                    for (ii in jsonResponse[i]['answer']) {

                        //create a variables
                        let input = document.createElement('input'),
                            group = document.createElement('div'),
                            label = document.createElement('label');

                        //Include css inside div
                        group.classList.add('answer');

                        //Include answer text and answer ID
                        label.innerText = jsonResponse[i]['answer'][ii];
                        label.setAttribute('for', `answer${ii}${jsonResponse[i]['id']}`);
                        label.setAttribute('forIdAnswer', `answer${ii}${jsonResponse[i]['id']}`);
                        label.classList.add('active');
                        
                        //Include within the input the answer ID of the previous div
                        input.type = 'radio';
                        input.name = `answer${jsonResponse[i]['id']}`;
                        input.id = `answer${ii}${jsonResponse[i]['id']}`;
                        input.setAttribute('IdAnswer', ii);
                        input.value = jsonResponse[i]['answer'][ii];

                        //Show with appendChild
                        group.appendChild(label);
                        grid.appendChild(input);
                        grid.appendChild(group);

                    }

                    // Show with appendChild
                    div.appendChild(grid);

                    //create a variables
                    let next = document.createElement('button');

                    //Create a Next button and include data for each question
                    next.classList.add('next');
                    next.innerText = language['next'];
                    next.setAttribute('id', jsonResponse[i]['id']);
                    next.setAttribute('onclick', `return next(${ Number(jsonResponse[i]['id']) != Math.max.apply(Math, numberToArray) ? Number(jsonResponse[i]['id']) + 1 : 0  }, event);`);
                    
                    // Show with appendChild
                    div.appendChild(next);
                }
            }

            
            //fetch an item [id-button] of div .list
            let idButton = document.querySelectorAll('[id-button]'),
                arrayIdButton = [];

            //Get the identifiers and include them inside the array
            for (let index = 0; index < idButton.length; index++) {
                arrayIdButton.push(idButton[index].getAttribute('id-button'));
            }

            //Sorts what is contained within the specified element which is [id-button]
            idButton.forEach( function(element, index) {
                let idButton = element.getAttribute('id-button'),
                    endItem = document.querySelector(`[id-button="${Math.max.apply(Math, arrayIdButton)}"]`);

                //Add an item to the last number of list
                endItem.setAttribute('end', '');

                //add 0 in onclick
                endItem.querySelector('.next').setAttribute('onclick', 'return next(0, event);');
                endItem.querySelector('.next').innerText = language['viewResult'];
                
                //Hide items other than 1
                if( element.getAttribute('id-button') == Math.min.apply(Math, arrayIdButton) ){
                    element.style.display = 'block';
                }else{
                    // element.style.display = 'block';
                    element.style.display = 'none';
                }
            });

        });

        //Create a new variable
        let div = document.createElement('div');
            goOut = document.createElement('button');
        
        goOut.setAttribute('onclick', 'return back();')
        goOut.innerHTML = language['backToSteps'];
        
        div.classList.add('back');
        div.appendChild(goOut);

        //Include a div inside content
        setTimeout(function(){

            //Delay in displaying back to stage list button
            content.insertAdjacentElement('beforeend', div);
            
            //Check if there is a question or not
            if( document.querySelector('.list') == null ){
                let notData = document.createElement('div');
                notData.classList.add('list', 'danger');
                notData.style.marginBottom = '1rem';
                notData.innerText = language['notQuest'];

                //Div function == Line number 319
                div.insertAdjacentElement('afterbegin', notData);
            }

            let sunQuez = document.querySelectorAll('.sunQuez');
            sunQuez.forEach(function(event){
                event.innerText = document.querySelectorAll('.list').length;
            });

        },100);

    }

    function next(min, event){
        let id = event.target.getAttribute('id') ?? 0,
            idDiv =  document.querySelector(`[id-button="${id}"]`),
            idButton = document.querySelectorAll('[id-button]'),
            input = idDiv.querySelector('input'),
            name = input.name,
            checked = idDiv.querySelector(`[name="${name}"]:checked`),
            checkAlertFalse = idDiv.querySelector('.alertFalse'),

            idanswer = idDiv.getAttribute('idanswer'),

            score = localStorage.getItem(`score`);
            
        if(checked == null){
            if( checkAlertFalse == null ){
                let createAlert = document.createElement('div');
                createAlert.classList.add('alertFalse');
                createAlert.innerText = language['plsClickAnswer'];
                document.querySelector(`[id-button="${id}"]`).querySelector('.question').insertAdjacentElement('afterend', createAlert);
            }
            return false
        }


        idDiv.querySelectorAll(`[name="${name}"]`).forEach(x => x.checked = false);
        
        if( checked.getAttribute('idanswer') == idanswer){
            document.querySelector(`[foridanswer="${checked.id}"]`).classList.add('true');
            
            if(score){
                localStorage.setItem(`score`, Number(score) + 1);
            }else{
                localStorage.setItem(`score`, 1);
            }
            
        }else{
            
            document.querySelector(`[foridanswer="${checked.id}"]`).classList.add('false');
            document.querySelectorAll(`[foridanswer="answer${idDiv.getAttribute('idanswer')}${idDiv.getAttribute('id-button')}"]`)[0].classList.add('true');
        }

        // const dataMember = {
        //     id          : Date.now,
        //     idCategory  : 1,
        //     score       : localStorage.getItem(`score`),
        //     text        : document.querySelector(`[foridanswer="${checked.id}"]`).innerText,
        //     answer      : document.querySelectorAll(`[foridanswer="answer${idDiv.getAttribute('idanswer')}${idDiv.getAttribute('id-button')}"]`)[0].innerText,
        // }; false

        // arrayDataMember.push(dataMember); false

        // upadataDataMemberLocalStorage(arrayDataMember); false


        if( min == 0 ){
            let list = document.querySelectorAll('.list');
            list.forEach(function(e){
                e.style.display = 'none';
                e.querySelector('button').remove();
            })

            goodEndStep = language['goodEndStep'].replace('(x1)', localStorage.getItem(`score`) );
            goodEndStep = goodEndStep.replace('(x2)', 1);
            
            let endStep = document.createElement('div');
            endStep.classList.add('list');
            endStep.style.marginBottom = '1rem';
            endStep.innerHTML = ` 
            <span style="display:block; margin-bottom:1rem">${goodEndStep}</span>
            <button class="btn" onclick="return document.querySelectorAll('.list').forEach(e => e.style.display = 'block');">${language['viewErrors']}</button>
            <button class="btn btn-primary" style="float:left;" onclick="return back();">${language['backToSteps']}</button>
            `;
            
            document.querySelector('.back').remove();

            document.querySelector('.steps').insertAdjacentElement('afterend', endStep);

            localStorage.removeItem(`score`);
            return false;
        }

        idButton.forEach(function(event){
            event.style.display = 'none';
        });

        document.querySelector(`[id-button="${min}"]`).style.display = 'block';

    }

    function back(){
        document.querySelectorAll('.list').forEach(function(e){
            e.remove();
        });

        document.querySelector('.steps').removeAttribute('style');

        document.querySelector('.back').remove();
    }

    function upadataDataMemberLocalStorage(arrayDataMember){
        window.localStorage.setItem(`data`, JSON.stringify(arrayDataMember));
    }

    function reviewErrors(){
        document.querySelectorAll('.list').forEach(e => e.style.display = 'block');
    }