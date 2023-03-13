import { SectionEntity } from '../../section.entity';
import { UserEntity } from '../../user.entity';
import { OpecomEntity } from '../opecom.entity';

interface Props {
  currentOpecom: OpecomEntity;
  deletedBy: Omit<UserEntity, 'permissions'>;
}

export function deleteRecursively({
  deletedBy,
  currentOpecom,
}: Props): OpecomEntity['info'] {
  const sections = currentOpecom.info.sections.map((section) => {
    const sectionEntity = new SectionEntity({
      ...section,
      createdBy: section.createdBy || deletedBy.info,
    });
    sectionEntity.delete(deletedBy.info);
    return sectionEntity.info;
  });
  return {
    ...currentOpecom.info,
    sections,
    integration: {
      ...currentOpecom.info.integration,
      status: 'needs_update',
    },
    deletedAt: new Date(),
    deletedBy: deletedBy.info,
  };
}
