// =============================
// ABRIR / CERRAR SECCIONES MENU
// =============================
function toggleMenu(titulo){

const seccion = titulo.nextElementSibling;
if(!seccion) return;

seccion.style.display =
seccion.style.display === "block" ? "none" : "block";

}


// =============================
// ACTIVAR / DESACTIVAR CANTIDAD
// =============================
function toggleCantidad(checkbox){

const item = checkbox.closest(".item");
if(!item) return;

const cantidad = item.querySelector(".cantidad");
if(!cantidad) return;

if(checkbox.checked){

cantidad.disabled = false;

if(cantidad.value == 0){
cantidad.value = 1;
}

}else{

cantidad.value = 0;
cantidad.disabled = true;

}

calcularTotal();

}


// =============================
// MOSTRAR DESCRIPCION
// =============================
function toggleDescripcion(checkbox){

const item = checkbox.closest(".item");
if(!item) return;

const descripcion = item.querySelector(".descripcion");
if(!descripcion) return;

descripcion.style.display =
checkbox.checked ? "block" : "none";

}


// =============================
// CALCULAR TOTAL
// =============================
function calcularTotal(){

let total = 0;

document.querySelectorAll(".check-plato").forEach(cb => {

if(!cb.checked) return;

const item = cb.closest(".item");
if(!item) return;

const cantidad = Number(item.querySelector(".cantidad")?.value) || 0;

let precio = 0;

// pizzas tamaño
const tamano = item.querySelector(".tamano");
if(tamano){
precio = Number(tamano.value);
}

// sabores con precio
const sabor = item.querySelector(".sabor");
if(!precio && sabor){
precio = Number(sabor.value);
}

// precio data
if(!precio && cb.dataset.precio){
precio = Number(cb.dataset.precio);
}

// precio span
if(!precio){
const span = item.querySelector("span");
if(span){
precio = Number(span.innerText.replace(/\$|\.|,/g,""));
}
}

total += precio * cantidad;

});

// Pizzas mitad y mitad
for(let n = 1; n <= 3; n++){
const a = parseInt(document.getElementById('mitad'+n+'a')?.value) || 0;
const b = parseInt(document.getElementById('mitad'+n+'b')?.value) || 0;
const precio = Math.max(a, b);
total += precio;
}

document.getElementById("total").innerText =
"$" + total.toLocaleString("es-CO");

document.getElementById("totalPedido").value = total;

}

// CONFIGURACION AL CARGAR
document.addEventListener("DOMContentLoaded",function(){

document.querySelectorAll(".menu-section .menu-contenido")
.forEach(sec=>{
sec.style.display="none";
});

document.querySelectorAll(".cantidad").forEach(c=>{
c.disabled=true;
c.value=0;
});

document.querySelectorAll(".descripcion")
.forEach(d=>d.style.display="none");

});

// =============================
// CONTROL ENTREGA
// =============================
document.addEventListener("DOMContentLoaded",function(){

const tipoEntrega = document.getElementById("tipoEntrega");
const direccionField = document.getElementById("direccionField");
const mesaField = document.getElementById("mesaField");
const costoDomicilio = document.getElementById("costoDomicilio");
const notaEmpaque = document.getElementById("notaEmpaque");

if(!tipoEntrega) return;

tipoEntrega.addEventListener("change",function(){

direccionField.style.display="none";
mesaField.style.display="none";
costoDomicilio.style.display="none";
notaEmpaque.style.display="none";

if(this.value==="A domicilio"){
direccionField.style.display="block";
costoDomicilio.style.display="block";
notaEmpaque.style.display="block";
}

if(this.value==="Recoger en el local"){
notaEmpaque.style.display="block";
}

if(this.value==="Comer dentro del local"){
mesaField.style.display="block";
}

});
});

// =============================
// CONTROL PAGOS
// =============================
document.addEventListener("DOMContentLoaded",function(){

const tipoPago = document.getElementById("tipoPago");

const infoPago = document.getElementById("infoPago");
const infoNequi = document.getElementById("infoNequi");
const infoBanco = document.getElementById("infoBanco");
const infoDaviplata = document.getElementById("infoDaviplata");
const infoCrediSevir = document.getElementById("infoCrediSevir");
const efectivoField = document.getElementById("efectivoField");

if(!tipoPago) return;

tipoPago.addEventListener("change",function(){

infoPago.style.display="none";
infoNequi.style.display="none";
infoBanco.style.display="none";
infoDaviplata.style.display="none";
infoCrediSevir.style.display="none";
efectivoField.style.display="none";

if(this.value==="Efectivo"){
efectivoField.style.display="block";
}

if(this.value==="Nequi"){
infoPago.style.display="block";
infoNequi.style.display="block";
}

if(this.value==="Bancolombia"){
infoPago.style.display="block";
infoBanco.style.display="block";
}

if(this.value==="Daviplata"){
infoPago.style.display="block";
infoDaviplata.style.display="block";
}

if(this.value==="CrediSevir"){
infoPago.style.display="block";
infoCrediSevir.style.display="block";
}

});

});


// =============================
// OBTENER PLATOS
// =============================
function obtenerPlatos(){

let platos="";

document.querySelectorAll(".check-plato:checked").forEach(cb=>{

const item = cb.closest(".item");
if(!item) return;

const cant = Number(item.querySelector(".cantidad")?.value) || 0;
if(cant<=0) return;

let nombre = cb.value;
let detalle="";

let seccion = cb.closest(".menu-section")?.querySelector("h2")?.innerText || "";
seccion = seccion.replace(/[^\p{L}\p{N}\s]/gu,"").trim();

const tamano = item.querySelector(".tamano");
if(tamano){

let txt=tamano.options[tamano.selectedIndex].text;
let letra=txt.split(" ")[0];

detalle="("+letra+")";

}

const sabor = item.querySelector(".sabor");
if(sabor){

let txt=sabor.options[sabor.selectedIndex].text;

if(detalle){
detalle=detalle+" - "+txt;
}else{
detalle="("+txt+")";
}

}

const tipo = item.querySelector(".tipo");
if(tipo){

let tipoTxt=tipo.options[tipo.selectedIndex].text;
let saborTxt=sabor?sabor.options[sabor.selectedIndex].text:"";

detalle="("+tipoTxt+" - "+saborTxt+")";

}

let nombreFinal = nombre;

if(nombre.toLowerCase().includes("frutti")){
nombreFinal = nombre
.replace("Lasagna ","")
.replace("Pasta ","");

nombreFinal = nombreFinal + " (" + seccion + ")";
}

platos+="• "+nombreFinal+" "+detalle+" x"+cant+"\n";

});

return platos;

}


// =============================
// 🔥 PIZZAS MITAD Y MITAD
// =============================
function obtenerPizzasMitad(){

let texto = "";

for(let n = 1; n <= 3; n++){

let s1 = document.getElementById('mitad'+n+'a');
let s2 = document.getElementById('mitad'+n+'b');

if(!s1 || !s2) continue;

let m1 = s1.options[s1.selectedIndex].text;
let m2 = s2.options[s2.selectedIndex].text;

if(m1.includes("Selecciona") || m2.includes("Selecciona")) continue;

m1 = m1.split(" ($")[0];
m2 = m2.split(" ($")[0];

let precio = document.getElementById('preciomitad'+n)?.innerText || "$0";

texto += "🍕 Pizza " + n + ":\n";
texto += "- Mitad 1: " + m1 + "\n";
texto += "- Mitad 2: " + m2 + "\n";
texto += "- Precio: " + precio + "\n\n";

}

return texto;
}


// =============================
// ENVIAR PEDIDO WHATSAPP
// =============================
document.addEventListener("DOMContentLoaded",function(){

const form=document.getElementById("pedidoForm");
if(!form) return;

let enviando=false;
let ultimoEnvio=0;

form.addEventListener("submit",function(e){

e.preventDefault();

const ahora=Date.now();

if(ahora-ultimoEnvio<5000) return;
if(enviando) return;

ultimoEnvio=ahora;
enviando=true;


// DATOS
const nombre=document.getElementById("nombre")?.value;
const telefono=document.getElementById("telefono")?.value;

const tipoEntrega=document.getElementById("tipoEntrega")?.value;
const direccion=document.getElementById("direccion")?.value;
const mesa=document.getElementById("numeroMesa")?.value;

const tipoPago=document.getElementById("tipoPago")?.value;
const efectivo=document.getElementById("efectivoCliente")?.value;

const especificaciones=document.getElementById("especificaciones")?.value;

// 🔥 AQUÍ EL FIX
let platos = obtenerPlatos();
let pizzas = obtenerPizzasMitad();

if(!platos.trim() && !pizzas.trim()){
alert("Debes seleccionar al menos un plato");
enviando=false;
return;
}

const total=document.getElementById("totalPedido")?.value;

let totalTexto="";

if(total){
totalTexto=Number(total).toLocaleString("es-CO",{
style:"currency",
currency:"COP",
minimumFractionDigits:0
});
}

// MENSAJE
let mensaje = "📦 Nuevo pedido recibido\n\n";

mensaje += "👤 Nombre: " + nombre + "\n\n";
mensaje += "📞 Número: " + telefono + "\n\n";

// 🔥 PLATOS
if (platos && platos.trim()) {
  mensaje += "🍽️ Platos:\n" + platos.trim() + "\n\n";
}

// 🔥 PIZZAS
if (pizzas && pizzas.trim()) {
  mensaje += "🍕 Pizzas:\n" + pizzas.trim() + "\n\n";
}

if (tipoEntrega) {
  mensaje += "📦 Método: " + tipoEntrega + "\n\n";
}

if (direccion) {
  mensaje += "📍 Dirección: " + direccion + "\n\n";
}

if (mesa) {
  mensaje += "🪑 Mesa: " + mesa + "\n\n";
}

if (tipoPago) {
  mensaje += "💳 Forma de Pago: " + tipoPago + "\n\n";
}

if (efectivo) {
  mensaje += "💵 Con cuánto paga: " + efectivo + "\n\n";
}

if (especificaciones) {
  mensaje += "📒 Especificaciones: " + especificaciones + "\n\n";
}

if (totalTexto) {
  mensaje += "🧾 Total: " + totalTexto;
}

// WHATSAPP
const numero="573222489307";

const url=
"https://api.whatsapp.com/send?phone="+
numero+
"&text="+
encodeURIComponent(mensaje);

window.open(url,"_blank");

setTimeout(function(){
window.location.href = "gracias.html";
}, 1500);

});

});


// =============================
// FORZAR CIERRE DEL MENU
// =============================
document.addEventListener("DOMContentLoaded", function(){

document.querySelectorAll(".menu-contenido").forEach(seccion=>{
seccion.style.display = "none";
});

});

function calcularMitad(n){
const a = parseInt(document.getElementById('mitad'+n+'a')?.value) || 0;
const b = parseInt(document.getElementById('mitad'+n+'b')?.value) || 0;
const precio = Math.max(a, b);
document.getElementById('preciomitad'+n).textContent =
precio > 0 ? '$' + precio.toLocaleString('es-CO') : '$0';
calcularTotal();
}