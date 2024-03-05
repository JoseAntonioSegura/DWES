import * as FacturaService from '../services/database/factura-db-service.js';

export const agregarFactura = async (req, res) => {
  const { userId, productos } = req.body;
  try {
    const result = await FacturaService.agregarFactura(userId, productos);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerFacturasPorUsuario = async (req, res) => {
  const { userId } = req.params;
  try {
    const facturas = await FacturaService.obtenerFacturasPorUsuario(userId);
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarFactura = async (req, res) => {
  const { facturaId } = req.params;
  try {
    const result = await FacturaService.eliminarFactura(facturaId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
