/**
 * Home.handlebars js
*/
var socket = io()

$(document).ready(function () {
    socket.on("Noti_new_order_to_staff", function (data) {
        alert("NEW ORDER(S)")

        // Temporary solution
        setTimeout(() => {
            location.reload()
        }, 5000);

    })

    /* Present order view - begin */
    // Order list view

    $('#present-order-body #btn-delivery').on('click', function () {
        confirm("DELIVERY THIS ORDER ?")
        $(this).text('Delivering')

        setTimeout(() => {
            // Some action 
        }, 1000)

        console.log($(this).text())
    })
    /* Present order view - end */

    /* Cancel order - begin */
    $('#present-order-body #btn-cancel').on('click', function () {
        confirm("CANCEL THIS ORDER ?")

        setTimeout(() => {
            // Some action
        }, 1000)
    })
    /* Cancel order - end */

    /* List orders view - begin */
    $('#list-orders-body').delegate('.btn-act-delivery', 'click', function () {
        confirm("DELIVERY " + $(this).closest('tr').attr('id') + " ORDER ?")
        
        socket.emit("Orders-List-delivery", $(this).closest('tr').attr('id'))

        // Swap
        var target = $(this).closest('tr').children('.td_card')
        var temp_OrderList = []
        var loop_length = target.find('.OrderList').length
        var temp = target.find('.OrderList')

        for (let i = 0; i <= loop_length - 3; i += 3) {
            temp_OrderList.push([temp[i].getAttribute('name'), temp[i + 1].getAttribute('name'), temp[i + 2].getAttribute('name')])
        }

        var temp_order_target = {
            id: $(this).closest('tr').attr('id'),
            Date: target.find('#OrderDate').attr('name'),
            Total: target.find('#Total').attr('name'),
            Note: target.find('#Note').attr('name'),
            OrderList: temp_OrderList
        }


        var current_order = $('#present-order-body table')
        var current_order_loop_length = current_order.find('.CurrentList').length
        var temp_current_order_item = current_order.find('.CurrentList')
        var temp_current_order_list = []

        for (let i = 0; i <= current_order_loop_length - 3; i += 3) {
            temp_current_order_list.push([temp_current_order_item[i].getAttribute('name'), temp_current_order_item[i+1].getAttribute('name'), temp_current_order_item[i+2].getAttribute('name')])
        }

        var temp_current_order = {
            id: current_order.find('#OrderID').attr('name'),
            Date: current_order.find('#OrderDate').attr('name'),
            Total: current_order.find('#Total').attr('name'),
            Note: current_order.find('#Note').attr('name'),
            OrderList: temp_current_order_list
        }

        console.log(current_order.find('.CurrentList'))
        console.log('target order')
        console.log(temp_order_target)

        console.log('current order')
        console.log(temp_current_order)

        var temp_swap = temp_current_order

        console.log('temp swap')
        console.log(temp_swap)
    })

    $('#list-orders-body').delegate('.btn-act-priority', 'click', function () {
       confirm('PUSH THIS ORDER ON TOP')

       socket.emit("Orders-List-set-priority", $(this).closest('tr').attr('id'))
    })

    $('#list-orders-body').delegate('.btn-act-cancel', 'click', function () {
        confirm('CANCEL THIS ORDER?')

        socket.emit("Orders-List-cancel", $(this).closest('tr').attr('id'))
    })
    /* list orders view - end */

    $('#navbarNav .nav-link').on('click', function () {
        console.log($(this).attr('id'))
        $(this).attr('class', 'nav-link active')
        var target = $(this).attr('id')
        // Case: present order tab
        if (target === 'nav-tab-present-order') {
            $('#nav-tab-list-orders').attr('class', 'nav-link passive')
            $('#nav-tab-completed-orders').attr('class', 'nav-link passive')

            $('#present-order-body').removeAttr('hidden')

            $('#list-orders-body').attr('hidden', 'true')
            $('#list-completed-orders-body').attr('hidden', 'true')
        }
        // Case: list orders tab
        else if (target === 'nav-tab-list-orders') {
            $('#nav-tab-present-order').attr('class', 'nav-link passive')
            $('#nav-tab-completed-orders').attr('class', 'nav-link passive')

            $('#list-orders-body').removeAttr('hidden')

            $('#present-order-body').attr('hidden', 'true')
            $('#list-completed-orders-body').attr('hidden', 'true')
        }
        // Case: Completed orders tab
        else {
            $('#nav-tab-list-orders').attr('class', 'nav-link passive')
            $('#nav-tab-present-order').attr('class', 'nav-link passive')

            $('#list-completed-orders-body').removeAttr('hidden')

            $('#list-orders-body').attr('hidden', 'true')
            $('#present-order-body').attr('hidden', 'true')
        }
    })
});