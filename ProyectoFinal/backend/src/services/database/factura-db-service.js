import Factura from '../../models/Factura.js';

// Agregar una factura a la base de datos
export async function agregarFactura(userId, productos) {
    try {
      // Crear un nuevo objeto de factura
      const nuevaFactura = new Factura({ userId });

      // Crear un objeto con los datos de los productos
      nuevaFactura.datosProducto = productos.map(({ productId, cantidad, precioOriginal }) => ({ productoId: productId, unidades: cantidad, precio: precioOriginal }));

      await nuevaFactura.save();
      return { message: 'Factura creada exitosamente', factura: nuevaFactura };
    } catch (error) {
      throw new Error('Error al agrgar factura');
    }
  };

// Obtener todas las facturas de un usuario
export async function obtenerFacturasPorUsuario(userId) {
    try {
      const facturas = await Factura.find({ userId });
      return facturas;
    } catch (error) {
      throw new Error('Error al obtener las facturas del usuario');
    }
  };

// Eliminar una factura de la base de datos
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
