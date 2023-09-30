import { AppDataSource } from '../db/data-source';
import { Journey } from '../db/entity/Journey';
import { Route } from '../db/entity/Route';
import { Station } from '../db/entity/Station';

interface newRouteData {
  startingStation: Station;
  endingStation: Station;
  distance_meter: number;
}

export const saveNewRoute = async (
  data: newRouteData,
  savedJourney: Journey
) => {
  const routeRepository = AppDataSource.getRepository(Route);
  const route = routeRepository.create(data);
  const result = await routeRepository.save(route);

  const savedRoute = await routeRepository.findOneBy({
    id: result.id,
  });

  if (!savedRoute) {
    throw new Error('Failed while merging journey into route.');
  }

  // update route with journey
  // it connects savedRoute to the corresponding journey
  routeRepository.merge(savedRoute, {
    journey: savedJourney,
  });

  const updatedRoute = await routeRepository.save(savedRoute);
  return updatedRoute;
};

export const getMinMaxDistance = async () => {
  const routeRepository = AppDataSource.getRepository(Route);
  const minMaxDistance = await routeRepository
    .createQueryBuilder('route')
    .select('MIN(route.distance_meter)', 'min')
    .addSelect('MAX(route.distance_meter)', 'max')
    .getRawOne();
  return minMaxDistance;
};
