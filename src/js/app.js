App = {
  web3Provider: null,
  contracts: {},

  init:  function() {
    // Load pets.
    return  App.initWeb3();
  },
  initWeb3:  function() {
    if(typeof web3 !=='undefined'){
      App.web3Provider=web3.currentProvider;
      web3=new Web3(App.web3Provider)
    }
    else{
      App.web3Provider=new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
      web3=new Web3(App.web3Provider);
    }
   
    return App.initContract();
  },
  initContract: function() {
    $.getJSON('Hello.json',function(hello){
      App.contracts.Hello=TruffleContract(hello);
      App.contracts.Hello.setProvider(App.web3Provider);
      return App.Display();
    });
   
   
  },
  Display: function() {
    $("#loading").show();
    $("#content").hide();
    App.contracts.Hello.deployed().then((hello)=>{
      return hello.name();
    }).then((name)=>{
      $("#display").html(name);

      $("#loading").hide();
    $("#content").show();
    });   
   
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
