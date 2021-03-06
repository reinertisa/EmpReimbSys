if (sessionStorage.getItem('currentUser') == null) {
    window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/error.html'
} else if (sessionStorage.getItem('userRole') == null) {
    window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/error.html'
}

console.log(sessionStorage.getItem('currentUser'))
console.log(sessionStorage.getItem('userRole'))

if (sessionStorage.getItem('userRole') == 'Employee') {

    fetchData();

    function fetchData() {

        fetch('http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/getAllReimbs', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('currentUser')
            })
        }).then(function (response) {

            if (!response.ok) {
                throw Error("ERROR");
            }

            return response.json();
        }).then(function (data) {
            console.log(data)

            if (data.status == 'process failed') {
                console.log('process failed')
                alert('Request failed, please try again!')
            } else if(data.status == 'unauthorized access'){
                console.log('unauthorized access')
                window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/error.html'
            } else if(data.status == 'no record') {
                console.log('no record')
                alert('There is no reimbursement in the system')
            } else {


                const html = data.map(reimb => {

                    let labelStatus = 'success';
                    let dataStatus = 'all';
                    if (reimb.reimbStatus === 'Approved') {
                        labelStatus = 'success';
                        dataStatus = 'inactive';
                    } else if (reimb.reimbStatus === 'Denied') {
                        labelStatus = 'danger';
                        dataStatus = 'expired';
                    } else if (reimb.reimbStatus === 'Pending') {
                        labelStatus = 'warning';
                        dataStatus = 'active';

                    }
                    return `
                        <tr data-status="${dataStatus}">
                        <td>${reimb.reimbId}</td>
                        <td><b>${reimb.reimbAmount}</b</td>
                        <td>${reimb.reimbType}</td>
                        <td><span class="label label-${labelStatus}">${reimb.reimbStatus}</span></td>
                        <td>${reimb.reimbSubmitted}</td>
                        <td>${reimb.reimbResolved}</td>
                        <td>${reimb.reimbDescription}</td>
                        <td><button type="submit" class="btn btn-primary" id="showImg" onclick="redirectShowReceipt(${reimb.reimbId})" value=${reimb.reimbId}>Receipt</button></td>
                        </tr>
                    `
                }).join("");

                console.log(html);
                document.querySelector('#app').insertAdjacentHTML('beforeend', html);
            }

        }).catch(error => {
            console.log(error);
            window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/error.html'
        });

    }

    $(document).ready(function () {
        $(".btn-group .btn").click(function () {
            var inputValue = $(this).find("input").val();
            if (inputValue != 'all') {
                var target = $('table tr[data-status="' + inputValue + '"]');
                $("table tbody tr").not(target).hide();
                target.fadeIn();
            }
            else {
                $("table tbody tr").fadeIn();
            }
        });
        // Changeing the class of status label to support bootstrap 4
        var bs = $.fn.tooltip.Constructor.VERSION;
        var support = bs.split(".");
        if (str[0] == 4) {
            $(".label").each(function () {
                var classStr = $(this).attr("class");
                var newClassStr = classStr.replace(/label/g, "badge");
                $(this).removeAttr("class").addClass(newClassStr);
            });
        }
    });

    function redirectShowReceipt(val){

        sessionStorage.setItem('receiptId', val);
        window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/EmpReceipt.html';
         
    }

} else if (sessionStorage.getItem('userRole') == 'Manager') {

    fetchData();

    function fetchData() {

        fetch('http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/getAllReimbs', {
            method: 'POST',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: sessionStorage.getItem('currentUser')
            })
        }).then(function (response) {

            if (!response.ok) {
                throw Error("ERROR");
            }

            return response.json();
        }).then(function (data) {
            console.log(data)

            if (data.status == 'process failed') {
                console.log('process failed')
                alert('Request failed, please try again!')
            } else if(data.status == 'unauthorized access'){
                console.log('unauthorized access')
                window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/error.html'
            } else if(data.status == 'no record') {
                console.log('no record')
                alert('There is no reimbursement in the system')
            } else {


                const html = data.map(reimb => {

                    let labelStatus = 'success';
                    let dataStatus = 'all';
                    if (reimb.reimbStatus === 'Approved') {
                        labelStatus = 'success';
                        dataStatus = 'inactive';
                    } else if (reimb.reimbStatus === 'Denied') {
                        labelStatus = 'danger';
                        dataStatus = 'expired';
                    } else if (reimb.reimbStatus === 'Pending') {
                        labelStatus = 'warning';
                        dataStatus = 'active';
                    }
                    return `
                        <tr data-status="${dataStatus}">
                        <td>${reimb.reimbId}</td>
                        <td><b>${reimb.reimbAmount}</b></td>
                        <td>${reimb.reimbType}</td>
                        <td><span class="label label-${labelStatus}">${reimb.reimbStatus}</span></td>
                        <td>${reimb.reimbAuthor}</td>
                        <td>${reimb.reimbSubmitted}</td>
                        <td>${reimb.reimbResolver}</td>
                        <td>${reimb.reimbResolved}</td>
                        <td>${reimb.reimbDescription}</td>
                        <td><button type="submit" class="btn btn-primary" id="showImg" onclick="redirectShowReceipt(${reimb.reimbId})" value=${reimb.reimbId}>Receipt</button></td>
                        </tr>
                      `
                }).join("");

                console.log(html);
                document.querySelector('#app').insertAdjacentHTML('beforeend', html);
            }

        }).catch(error => {
            console.log(error);
            window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/index.html'
        });

    }

    $(document).ready(function () {
        $(".btn-group .btn").click(function () {
            var inputValue = $(this).find("input").val();
            if (inputValue != 'all') {
                var target = $('table tr[data-status="' + inputValue + '"]');
                $("table tbody tr").not(target).hide();
                target.fadeIn();
            }
            else {
                $("table tbody tr").fadeIn();
            }
        });
        // Changeing the class of status label to support bootstrap 4
        var bs = $.fn.tooltip.Constructor.VERSION;
        var support = bs.split(".");
        if (str[0] == 4) {
            $(".label").each(function () {
                var classStr = $(this).attr("class");
                var newClassStr = classStr.replace(/label/g, "badge");
                $(this).removeAttr("class").addClass(newClassStr);
            });
        }
    });


    function redirectShowReceipt(val){

        sessionStorage.setItem('receiptId', val);
        window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/MngReceipt.html';
         
    }

} else {
    window.location.href = 'http://ec2-3-129-208-148.us-east-2.compute.amazonaws.com:8080/project-1/resources/html/error.html'
}