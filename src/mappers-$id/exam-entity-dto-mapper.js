// DTO style matches entity-dto-mapper.js in the supplied template.
// [แก้ field list] Summary/detail must match the actual API specification.
export default class EntityDtoMapper {
  static toSummaryDTO(entity) {
    return {
      id: entity.productCode,
      name: entity.productName,
      scale: entity.productScale,
      retailPrice: Number(entity.MSRP),
    };
  }

  static toDetailDTO(entity) {
    const { MSRP, buyPrice, ...detail } = entity;
    return {
      ...detail,
      retailPrice: Number(MSRP),
      price: Number(buyPrice),
    };
  }

  static map(entity, viewType = 'full') {
    return viewType === 'summary'
      ? this.toSummaryDTO(entity)
      : this.toDetailDTO(entity);
  }

  static maps(entities, viewType = 'summary') {
    const totalItems = entities.totalItems;
    const mappedEntities = entities.map((entity) => this.map(entity, viewType));

    // Preserve totalItems = 0 so empty results still get correct pagination.
    if (totalItems !== undefined) mappedEntities.totalItems = totalItems;
    return mappedEntities;
  }
}
