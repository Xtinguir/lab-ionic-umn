async function emptyAlert() {
    const alertController = document.querySelector('ion-alert-controller');
    const alert = await alertController.create({
      header: 'Terjadi Kesalahan',
      message: 'Mohon masukkan nama dan jumlah pengeluaran',
      buttons: ['Tutup']
    });
    return await alert.present();
}

$(document).ready(function(){
    var totalPayment = 0;
    
    $("#btnAdd").click(function(){
        var inputName = $("#inputName").val();
        var inputPrice = $("#inputPrice").val();

        if(inputName == '' || inputPrice == ''){
            emptyAlert();
        }
        
        else{
            $("#inputName").val('');
            $("#inputPrice").val('');
            totalPayment = parseInt(totalPayment) + parseInt(inputPrice);
            $("#budgetContent").append(
                "<ion-item>"+
                    inputName + " : Rp. " + inputPrice + ",00" +
                "</ion-item>"
            );
            $("#totalPriceContent").text("Total Pengeluaran : Rp. " + totalPayment + ",00");
        }
    })
});


