
var socket = io()

$(document).ready(function () {

    function add_Refreshment_list_to_check_exist(refreshment_check, index) {

        var Refreshment_list_temp = document.getElementsByClassName('form-select')

        if (refreshment_check !== 'Chọn món') {
            let temp = document.getElementsByClassName('quantity_value')
            for (let i = 0; i < Refreshment_list_temp.length; i++) {
                if (index != i) {
                    if (refreshment_check === Refreshment_list_temp[i].value) {
                        temp[i].setAttribute('value', parseInt(temp[i].value) + 1)             
                        document.getElementById('table').deleteRow(index + 1)
                    }
                }
            }
        }
    }

    function change_total_event() {

        let Unit_pirce = document.getElementsByClassName('Refreshment_unit_price')
        let Unit_quantity = document.getElementsByClassName('quantity_value')
        let temp_Total = 0

        // TODO: Calculate total cost
        for (let i = 0; i < Unit_pirce.length; i++) {
            temp_Total += parseInt(Unit_pirce[i].value) * parseInt(Unit_quantity[i].value)
        }

        document.getElementById('Total').innerText = `Tổng: ` + temp_Total
        document.getElementById('Total_cost').value = temp_Total
    }

    change_total_event()

    $('#Datetime').attr('value', Date())

    // TODO: Minus refreshment quantity
    $('body').delegate('.quantity-left-minus', 'click', function () {

        var target = $(this).parent().parent().find("#Quantity").attr("value")
        var temp_target_value = parseInt(target) - 1

        if (target == '1') {
            $(this).closest('tr').remove()
        }

        $(this).parent().parent().find("#Quantity").attr("value", temp_target_value.toString(10))

        change_total_event()
    })

    // TODO: Plus refreshment quantity
    $('body').delegate('.quantity-right-plus', 'click', function () {

        var target = $(this).parent().parent().find("#Quantity").attr("value")
        var temp_target_value = parseInt(target) + 1

        $(this).parent().parent().find("#Quantity").attr("value", temp_target_value.toString(10))

        change_total_event()
    })

    // TODO: Change unit price when select form changed
    $('body').delegate('.form-select', 'change', function () {

        // console.log($('.form-select').index(this))
        $(this).find('option[value="Default"]').remove()

        if ($('.form-select').length != 1) {
            add_Refreshment_list_to_check_exist($(this).val(), $('.form-select').index(this))
        }

        switch ($(this).val()) {
            case 'Black Coffee':
                $(this).closest('tr').find('.Refreshment_unit_price').val(15000)
                break
            case 'Tea':
                $(this).closest('tr').find('.Refreshment_unit_price').val(12000)
                break
            case 'Beer':
                $(this).closest('tr').find('.Refreshment_unit_price').val(18000)
                break
            case 'Capuchino':
                $(this).closest('tr').find('.Refreshment_unit_price').val(22000)
                break
            case 'Milk':
                $(this).closest('tr').find('.Refreshment_unit_price').val(14000)
                break
            default:
                $(this).closest('tr').find('.Refreshment_unit_price').val(25000)
                break
        }

        change_total_event()
    })

    // Add refreshment
    $('#Add_refreshment').on('click', function () {

        var Select_refreshment_row = `
        <tr>
            <td>
                <select class="form-select" aria-label="Refreshment_name" name="Refreshment">
                    <option value="Default">Chọn món</option>
                    <option value="Black Coffee">BLack Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Beer">Beer</option>
                    <option value="Capuchino">Capuchino</option>
                    <option value="Milk">Milk</option>
                    <option value="Expresso">Expresso</option>
                </select>
            </td>
            <td>
                <input type="number" class="form-control input-number Refreshment_unit_price" name="Refreshment_unit_price"
                    value="00000" readonly="true">
            </td>
            <td>
                <div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="quantity-left-minus btn btn-danger btn-number"
                            data-type="minus" data-field="">
                            -
                            <span class="glyphicon glyphicon-minus"></span>
                        </button>
                    </span>
                    <input type="number" id="Quantity" name="Quantity"
                        class="form-control input-number quantity_value" value="1" readonly="true">
                    <span class="input-group-btn">
                        <button type="button" class="quantity-right-plus btn btn-success btn-number"
                            data-type="plus" data-field="">
                            +
                            <span class="glyphicon glyphicon-plus"></span>
                        </button>
                    </span>
                </div>
            </td>
        </tr>
            `
        $('tbody').append(Select_refreshment_row)

        change_total_event()
    })

    $('#modal-btn-success').on('click', function () {
        socket.emit("Client_new_order")

        $('form').attr('method', 'post')
    })
});
