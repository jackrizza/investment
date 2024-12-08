/*

<div class="tabs is-centered">
  <ul>
    <li class="is-active"><a>Overview</a></li>
    <li><a>Performace</a></li>
    <li><a>Allocations</a></li>
  </ul>
</div>

*/



function charts() {
    chart_tabs();


    if (localStorage.getItem("active_chart_tab") === null) {
        localStorage.setItem("active_chart_tab", "Overview");
    }

    update_chart();

    
}

function update_chart() {
    if (document.querySelector(".chart") !== null) {
        chart_container.querySelector(".chart").remove();
    }
    console.log(localStorage.getItem("active_chart_tab"));
    if (localStorage.getItem("active_chart_tab") === 'Overview') {
        overview_chart();
    }
    if (localStorage.getItem("active_chart_tab") === 'Performance') {
        performance_chart();
    }
    if (localStorage.getItem("active_chart_tab") === 'Allocations') {
        allocations_chart();
    }
}

function performance_chart() {
    overview_chart();
}

function allocations_chart() {
    overview_chart();
}

function overview_chart() {

    let chart_container = document.getElementById('chart_container');
   
    let chart = document.createElement('div');
    chart.classList.add('chart');

    let canvas = document.createElement('canvas');
    canvas.id = 'overview_chart';

    chart.appendChild(canvas);
    chart_container.appendChild(chart);

    var ctx = document.getElementById('overview_chart').getContext('2d');

    var positionInfo = chart.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    var resize_width = width * 0.4;
    var resize_height = resize_width * (9/16);
    ctx.canvas.width = resize_width;
    ctx.canvas.height = resize_height;

    

    getRandomData(initialDateStr);

    var charter = new Chart(ctx, {
    type: 'candlestick',
    data: {
        datasets: [{
        label: 'CHRT - Chart.js Corporation',
        data: barData,
        }, {
        label: 'Close price',
        type: 'line',
        data: lineData,
        hidden: true,
        }]
    }
    });
}

function chart_tabs() {
    let chart_container = document.getElementById('chart_container');

    let tabs = document.createElement('div');
    tabs.classList.add('tabs');
    tabs.classList.add('is-centered');

    let ul = document.createElement('ul');

    let overview = document.createElement('li');
    overview.classList.add('is-active');
    let a = document.createElement('a');
    a.textContent = 'Overview';
    overview.appendChild(a);

    let performance = document.createElement('li');
    let a1 = document.createElement('a');
    a1.textContent = 'Performance';
    performance.appendChild(a1);

    let allocations = document.createElement('li');
    let a2 = document.createElement('a');
    a2.textContent = 'Allocations';
    allocations.appendChild(a2);

    if (localStorage.getItem("active_chart_tab") === null) {
        localStorage.setItem("active_chart_tab", "Overview");
    }

    let active_tab = localStorage.getItem("active_chart_tab");
    if (active_tab === 'Overview') {
        overview.classList.add('is-active');
        performance.classList.remove('is-active');
        allocations.classList.remove('is-active');
    } else if (active_tab === 'Performance') {
        overview.classList.remove('is-active');
        performance.classList.add('is-active');
        allocations.classList.remove('is-active');
    } else if (active_tab === 'Allocations') {
        overview.classList.remove('is-active');
        performance.classList.remove('is-active');
        allocations.classList.add('is-active');
    }

    overview.addEventListener('click', function() {
        localStorage.setItem("active_chart_tab", "Overview");
        overview.classList.add('is-active');
        performance.classList.remove('is-active');
        allocations.classList.remove('is-active');
        update_chart();
    });

    performance.addEventListener('click', function() {
        localStorage.setItem("active_chart_tab", "Performance");
        overview.classList.remove('is-active');
        performance.classList.add('is-active');
        allocations.classList.remove('is-active');
        update_chart();
    });

    allocations.addEventListener('click', function() {
        localStorage.setItem("active_chart_tab", "Allocations");
        overview.classList.remove('is-active');
        performance.classList.remove('is-active');
        allocations.classList.add('is-active');
        update_chart();
    });

    ul.appendChild(overview);
    ul.appendChild(performance);
    ul.appendChild(allocations);

    tabs.appendChild(ul);

    chart_container.appendChild(tabs);
}