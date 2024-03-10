const RouteModel = require("../Models/routeModel");

// Rota listeleme
// get all routes
exports.listRoutes = async (req, res) => {
  try {
    const routes = await RouteModel.getAllRoutes();
    if(routes.length)
    res.status(200).send(routes);
  else
  res.status(200).json({messgae:"No routes available"});

  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while getting the Routes.",
    });
  }
};

// Yeni rota oluşturma
// Create a route
exports.createRoute = async (req, res) => {
  const { name, description, photo, city, is_adult } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Route name cannot be empty!",
    });
  }

  const newRoute = {
    name,
    description,
    photo,
    city,
    is_adult,
  };
  try {
    await RouteModel.createRoute(newRoute);
    res.status(200).send({message:"route created successfully"});
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Route.",
    });
  }
};

exports.updateRoute = (req, res) => {
  const { id } = req.params;
  const { name, description, photo, city } = req.body;

  if (!name) {
    return res.status(400).send({
      message: "Route name cannot be empty!",
    });
  }

  const updatedRoute = {
    id,
    name,
    description,
    photo,
    city,
  };

  RouteModel.updateRoute(updatedRoute, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while updating the Route.",
      });
    } else {
      res.send(data);
    }
  });
};

// Rota silme
exports.deleteRoute = (req, res) => {
  const { id } = req.params;

  RouteModel.deleteRoute(id, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while deleting the Route.",
      });
    } else {
      res.send({ message: "Route deleted successfully!" });
    }
  });
};
