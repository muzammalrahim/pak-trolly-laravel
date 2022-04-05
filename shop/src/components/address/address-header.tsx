import PlusIcon from "@components/icons/plus-icon";
import { useTranslation } from "next-i18next";

interface AddressHeaderProps {
  count: number | boolean;
  label: string;
  onAdd: () => void;
}

export const AddressHeader: React.FC<AddressHeaderProps> = ({
  onAdd,
  count,
  label,
}) => {
  const { t } = useTranslation("common");
  return (
    <div className="flex items-center justify-between mb-5 lg:mb-6 xl:mb-7 -mt-1 xl:-mt-2">
      <div className="flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse text-lg lg:text-xl xl:text-2xl text-blue capitalize font-bold">
        {count && (
          <span className="flex items-center justify-center ltr:mr-2 rtl:ml-2">
            {count}.
          </span>
        )}
        {label}
      </div>
      <div className="mb-3 pt-0">
  {/* <input type="text" placeholder="Placeholder" className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/> */}
</div>
      {onAdd && (
        <button className="flex items-center text-sm font-semibold text-blue transition-colors duration-200     focus:outline-none focus:opacity-70 hover:opacity-70 mt-1" onClick={onAdd}>
          <PlusIcon className="w-4 h-4 stroke-2 ltr:mr-0.5 rtl:ml-0.5 relative top-[1px]" />
          {t("text-add")}
        </button>
        
      )}
      
    </div>
  );
};
