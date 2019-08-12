var pixelsPorCentimetro = 30,
	metrosPorCentimetro = 0.3;

function dibujarPlano(svgElement) {
	svgElement.appendChild(perimetroExterior());
	svgElement.appendChild(lavadero());
	svgElement.appendChild(pasillo());
	svgElement.appendChild(baño());
	svgElement.appendChild(cocina());
	svgElement.appendChild(escalera());
	svgElement.appendChild(comedor());
}

function perimetroExterior() {
	var perimetroExterior = parteSvg('rect');
	perimetroExterior.setAttribute("width", aPixels(10));
	perimetroExterior.setAttribute("height", aPixels(7));
	perimetroExterior.setAttribute("class", 'perimetro-exterior');
	return perimetroExterior;
}

function lavadero() {
	var lavadero = parteSvg('g');

	lavadero.appendChild(pared(7.90, 4.10, 9.85, 4.10));
	lavadero.appendChild(pared(7.90, 4.10, 7.90, 5.77));

	lavadero.appendChild(pared(7.90, 6.75, 7.90, 6.85));
	lavadero.appendChild(pared(7.90, 6.85, 8.275, 6.85));
	lavadero.appendChild(pared(9.475, 6.85, 9.85, 6.85));
	lavadero.appendChild(pared(9.85, 4.10, 9.85, 4.20));
	lavadero.appendChild(pared(9.85, 5, 9.85, 6.85));

	return lavadero;
}

function pasillo() {
	var pasillo = parteSvg('g');

	// division lavadero
	pasillo.appendChild(pared(7.75, 3.95, 7.75, 5.77));
	pasillo.appendChild(pared(7.75, 6.75, 7.75, 6.85));
	// ventanita
	pasillo.appendChild(pared(7.60, 6.85, 7.75, 6.85));
	pasillo.appendChild(pared(6.90, 6.85, 7.10, 6.85));
	// division baño
	pasillo.appendChild(pared(6.90, 6.75, 6.90, 6.85));
	pasillo.appendChild(pared(6.90, 3.95, 6.90, 5.95));

	return pasillo;
}

function baño() {
	var res = parteSvg('g');

	// division pasillo
	res.appendChild(pared(6.75, 6.75, 6.75, 6.85));
	res.appendChild(pared(6.75, 4.10, 6.75, 5.95));
	
	// ventana
	res.appendChild(pared(6.40, 6.85, 6.75, 6.85));
	res.appendChild(pared(4.75, 6.85, 5.20, 6.85));

	// division exterior
	res.appendChild(pared(4.75, 4.10, 4.75, 6.85));

	// division cocina
	res.appendChild(pared(4.75, 4.10, 6.75, 4.10));

	return res;
}

function cocina() {
	var res = parteSvg('g');

	// division lavadero
	res.appendChild(pared(7.75, 3.95, 9.85, 3.95));
	// division baño
	res.appendChild(pared(4.80, 3.95, 6.90, 3.95));
	// division bomba
	res.appendChild(pared(9.85, 0.15, 9.85, 1.45));
	res.appendChild(pared(9.85, 2.65, 9.85, 3.95));

	// division galeria
	res.appendChild(pared(6.46, 0.15, 6.56, 0.15));
	res.appendChild(pared(7.56, 0.15, 9.85, 0.15));

	return res;
}

function escalera() {
	var res = parteSvg('g');

	res.appendChild(tramoEscalera(4.80, 0.15, 0.83, 2.00, -1))
	res.appendChild(tramoEscalera(5.63, 0.15, 0.83, 2.00, 1))

	return res;	
}

function comedor() {
	var res = parteSvg('g');

	res.appendChild(pared(0.15, 3.95, 0.80, 3.95))
	res.appendChild(pared(2.80, 3.95, 3.45, 3.95))
	res.appendChild(pared(4.45, 3.95, 4.80, 3.95))

	// division galeria
	res.appendChild(pared(0.15, 0.15, 0.80, 0.15))
	res.appendChild(pared(2.80, 0.15, 4.80, 0.15))

	// division calle
	res.appendChild(pared(0.15, 0.15, 0.15, 1.35))
	res.appendChild(pared(0.15, 2.75, 0.15, 3.95))

	return res;
}

function aPixels(medidaMetros) {
	return Math.round(medidaMetros * pixelsPorCentimetro/ metrosPorCentimetro);
}

function pared(x1, y1, x2, y2) {
	var pared = parteSvg('line');
	pared.setAttribute("x1", aPixels(x1));
	pared.setAttribute("y1", aPixels(y1));
	pared.setAttribute("x2", aPixels(x2));
	pared.setAttribute("y2", aPixels(y2));
	return pared;
}

function parteSvg(nombre) {
	return document.createElementNS("http://www.w3.org/2000/svg", nombre);
}

function tramoEscalera(x, y, ancho, largo, direccion) {

	var tramo = parteSvg('g'),
		caja = parteSvg('rect')

	caja.setAttribute("width", aPixels(ancho));
	caja.setAttribute("height", aPixels(largo));
	caja.setAttribute("x", aPixels(x));
	caja.setAttribute("y", aPixels(y));
	caja.setAttribute("class", 'escalera');

	tramo.appendChild(caja);

	for (var i = y + 0.80; i < y + largo; i += 0.25) {
		var escalon = parteSvg('line');
		escalon.setAttribute('x1', aPixels(x));
		escalon.setAttribute('y1', aPixels(i));
		escalon.setAttribute('x2', aPixels(x + ancho));
		escalon.setAttribute('y2', aPixels(i));
		tramo.appendChild(escalon)
	}

	var escalon = parteSvg('line');
	escalon.setAttribute('x1', aPixels(x));
	escalon.setAttribute('x2', aPixels(x + ancho));


	if (direccion == 1) {
		escalon.setAttribute('y1', aPixels(y + 0.80));
		escalon.setAttribute('y2', aPixels(y));
	} else {
		escalon.setAttribute('y2', aPixels(y + 0.80));
		escalon.setAttribute('y1', aPixels(y));
	}
	tramo.appendChild(escalon)

	return tramo;
}