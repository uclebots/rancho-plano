var electricidad = {}

electricidad.lavadero = function() {
	var lavadero = parteSvg('g');
	lavadero.appendChild(electricidad.caja(8.875, 5.475))
	lavadero.appendChild(electricidad.caja(9.175, 5.475))
	lavadero.appendChild(cota(8.875, 5.475, 9.85, 5.475, "0.97 m"));
	lavadero.appendChild(cota(8.875, 5.475, 8.875, 6.85, "1.37 m"));

	lavadero.appendChild(corrugado(8.875, 5.475, 9.85, 5.10))
	lavadero.appendChild(corrugado(8.875, 5.475, 7.90, 5.67))
	lavadero.appendChild(corrugado(8.875, 5.475, 9.175, 5.475))
	return lavadero;
}

electricidad.banio = function() {
	var res = parteSvg('g');
	res.appendChild(electricidad.caja(5.8, 5.475))
	res.appendChild(electricidad.caja(6.1, 5.475))
	res.appendChild(cota(4.75, 5.475, 5.8, 5.475, "1.0 m"));
	res.appendChild(cota(5.8, 5.475, 5.8, 6.85, "1.37 m"));
	res.appendChild(corrugado(5.8, 5.475, 6.75, 5.85));
	res.appendChild(corrugado(5.8, 5.475, 4.75, 6.85));
	res.appendChild(corrugado(5.8, 5.44, 6.1, 5.44));
	return res;
}

electricidad.pasillo = function() {
	var res = parteSvg('g');
	res.appendChild(electricidad.caja(7.35, 5.475))
	res.appendChild(electricidad.caja(7.55, 5.475))
	res.appendChild(cota(7.35, 5.475, 7.75, 5.475, "0.42 m"));
	res.appendChild(cota(7.35, 5.475, 7.35, 6.85, "1.37 m"));
	res.appendChild(corrugado(7.35, 5.475, 6.90, 4.10));
	res.appendChild(corrugado(7.35, 5.45, 7.55, 5.45));
	return res;
}

electricidad.pasilloEscalera = function() {
	var res = parteSvg('g');
	res.appendChild(electricidad.caja(5.63, 3.05))
	res.appendChild(electricidad.caja(5.93, 3.05))
	res.appendChild(cota(5.63, 3.05, 5.63, 3.95, "0.9 m"));
	res.appendChild(cota(4.80, 3.05, 5.63, 3.05, "0.8 m"));
	res.appendChild(corrugado(5.63, 3.05, 5.63, 3.95));
	res.appendChild(corrugado(5.63, 3.05, 5.93, 3.05));
	return res;
}

electricidad.red = function() {
	var res = parteSvg('g');
	// lavadero - baño
	res.appendChild(corrugado(8.875, 5.475, 5.8, 5.475, 'corrugado-red'));
	// lavadero - cocina
	res.appendChild(corrugado(9.35, 4.10, 8.155, 2.05, 'corrugado-red'));
	// lavadero - comedor
	res.appendChild(corrugado(4.80, 2.35, 9.35, 4.10, 'corrugado-red'));
	// lavadero - galeria
	res.appendChild(corrugado(6.46, 0, 9.35, 4.10, 'corrugado-red'));

	// lavadero - red
	res.appendChild(corrugado(8.875, 5.475, 9.35, 4.10, 'corrugado-red'));
	// cocina - pasillo escalera
	res.appendChild(corrugado(8.155, 2.05, 5.63, 3.05, 'corrugado-red'));
	return res;
}

electricidad.cocina = function() {
	var res = parteSvg('g');
	res.appendChild(electricidad.caja(8.155, 2.05))
	res.appendChild(electricidad.caja(8.455, 2.05))
	res.appendChild(cota(8.155, 2.05, 9.85, 2.05, "1.7 m"));
	res.appendChild(cota(8.155, 2.05, 8.155, 3.95, "1.9 m"));
	res.appendChild(corrugado(8.155, 2.05, 7.66,0.15));
	
	res.appendChild(corrugado(8.155, 2.05, 8.875,3.95));
	res.appendChild(corrugado(8.155, 2.05, 8.455, 2.05));
	return res;
}

electricidad.caja = function(cx, cy) {
	console.log('caja')
	var caja = parteSvg('polygon'),
		puntos = '';

	altura = 0.05
	medioLado = altura * Math.tan(Math.PI/8);
	
	puntos += aPixels(cx - medioLado) + ',' + aPixels(cy - altura) + ' ' 
	puntos += aPixels(cx + medioLado) + ',' + aPixels(cy - altura) + ' ' 
	puntos += aPixels(cx + altura) + ',' + aPixels(cy - medioLado) + ' ' 
	puntos += aPixels(cx + altura) + ',' + aPixels(cy + medioLado) + ' ' 
	puntos += aPixels(cx + medioLado) + ',' + aPixels(cy + altura) + ' ' 
	puntos += aPixels(cx - medioLado) + ',' + aPixels(cy + altura) + ' ' 
	puntos += aPixels(cx - altura) + ',' + aPixels(cy + medioLado) + ' '
	puntos += aPixels(cx - altura) + ',' + aPixels(cy - medioLado) + ' '

	console.log(puntos);

	caja.setAttribute('points', puntos);
	//caja.setAttribute('cy', aPixels(1));
	caja.setAttribute('class', 'caja-hexagonal');
	return caja;
}

function dibujarPlanoElectrico(svgElement) {
	svgElement.appendChild(electricidad.lavadero());
	svgElement.appendChild(electricidad.banio());
	svgElement.appendChild(electricidad.pasillo());
	svgElement.appendChild(electricidad.pasilloEscalera());
	svgElement.appendChild(electricidad.cocina());
	svgElement.appendChild(electricidad.red());
}

function cota(x1, y1, x2, y2, longitud) {
	var res = parteSvg('g'),
		linea = parteSvg('line'),
		texto = parteSvg('text');

	texto.setAttribute('x', aPixels(x1) + 5);
	texto.setAttribute('y', aPixels((y1 + y2) / 2) - 5);
	texto.appendChild(document.createTextNode(''+longitud));

	linea.setAttribute('x1', aPixels(x1));
	linea.setAttribute('y1', aPixels(y1));
	linea.setAttribute('x2', aPixels(x2));
	linea.setAttribute('y2', aPixels(y2));

	res.appendChild(linea);
	res.appendChild(texto);
	return res;
}

function corrugado(x1, y1, x2, y2, clase) {
	if (!clase) {
		clase = 'corrugado'
	}
	var res = parteSvg('line');
	res.setAttribute('x1', aPixels(x1));
	res.setAttribute('y1', aPixels(y1));
	res.setAttribute('x2', aPixels(x2));
	res.setAttribute('y2', aPixels(y2));
	res.setAttribute('class', clase);
	return res;
}