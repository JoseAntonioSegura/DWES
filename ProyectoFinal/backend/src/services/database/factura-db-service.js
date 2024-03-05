import Factura from '../../models/Factura.js';

export async function agregarFactura(userId, productos) {
    try {
      const nuevaFactura = new Factura({ userId });

      nuevaFactura.datosProducto = productos.map(({ productId, cantidad, precioOriginal }) => ({ productoId: productId, unidades: cantidad, precio: precioOriginal }));

      await nuevaFactura.save();
      return { message: 'Factura creada exitosamente', factura: nuevaFactura };
    } catch (error) {
      throw new Error('Error al agrgar factura');
    }
  };

export async function obtenerFacturasPorUsuario(userId) {
    try {
      const facturas = await Factura.find({ userId });
      return facturas;
    } catch (error) {
      throw new Error('Error al obtener las facturas del usuario');
    }
  };

export async function eliminarFactura(facturaId) {
    try {
      const facturaEliminada = await Factura.findByIdAndDelete(facturaId);
      if (!facturaEliminada) {
        throw new Error('Factura no encontrada');
      }
      return { message: 'Factura eliminada correctamente', factura: facturaEliminada };
    } catch (error) {
      throw new Error('Error al eliminar factura');
    }
};
