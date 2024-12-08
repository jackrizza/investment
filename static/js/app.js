/*

<div id="app">
    <div class="container">
        <div class="column" id="sidebar_container">
            <!-- Side Bar -->
        </div>
        <div class="column" id="content_container">
            <div class="row" id="chart_container">
                <!-- Chart -->
            </div>
            <div class="row" id="position_container">
                <!-- Positions -->
            </div>
        </div>
    </div>
</div>

*/

function init() {
    let app = document.getElementById('app');


    let container = document.createElement('div');
    container.classList.add('columns', 'is-mobile');
    
    let sidebar_container = document.createElement('div');
    sidebar_container.classList.add('column', 'is-one-fifth');
    sidebar_container.id = 'sidebar_container';

    let content_container = document.createElement('div');
    content_container.classList.add('column');
    content_container.id = 'content_container';

    let chart_container = document.createElement('div');
    chart_container.classList.add('row');
    chart_container.id = 'chart_container';

    let position_container = document.createElement('div');
    position_container.classList.add('row');
    position_container.id = 'position_container';

    content_container.appendChild(chart_container);
    content_container.appendChild(position_container);

    container.appendChild(sidebar_container);
    container.appendChild(content_container);

    app.appendChild(container);
}


window.onload = function() {
    init();
    sidebar();
    charts();

};

window.addEventListener('storage', function(event) {
    if (event.key === 'active_chart_tab') {
        let active_tab = localStorage.getItem("active_chart_tab");
        if (active_tab == "Overview") {
            overview_chart();
        }
        if (active_tab == "Performance") {
            performance_chart();
        }
        if (active_tab == "Allocations") {
            allocations_chart();
        }
    }
});