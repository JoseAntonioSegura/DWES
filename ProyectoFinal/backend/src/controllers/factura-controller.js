import * as FacturaService from '../services/database/factura-db-service.js';
import { HttpStatusError } from 'common-errors';


// Agregar una factura manualmente
export const agregarFactura = async (req, res) => {
  const { userId, productos } = req.body;
  try {
    // Agregar la factura a la base de datos y devolver la factura creada
    const result = await FacturaService.agregarFactura(userId, productos);
    res.status(201).json(result); 
  } catch (error) {
    // Manejar errores
    if (error instanceof HttpStatusError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Obtener todas las facturas de la base de datos
export const obtenerFacturasPorUsuario = async (req, res) => {
  const { userId } = req.params;
  try {
    // Obtener las facturas de la base de datos y devolverlas
    const facturas = await FacturaService.obtenerFacturasPorUsuario(userId);
    res.json(facturas);
  } catch (error) {
    if (error instanceof HttpStatusError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Eliminar una factura (Solo lo uso para pruebas, no debería estar en la API pública)
export const eliminarFactura = async (req, res) => {
  const { facturaId } = req.params;
  try {
    const result = await FacturaService.eliminarFactura(facturaId);
    res.json(result);
  } catch (error) {
    if (error instanceof HttpStatusError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Obtener una factura por su ID
export const obtenerFacturaPorId = async (req, res) => {
  const { facturaId } = req.params;
  try {
    const factura = await FacturaService.obtenerFacturaPorId(facturaId);
    res.json(factura);
  } catch (error) {
    if (error instanceof HttpStatusError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};