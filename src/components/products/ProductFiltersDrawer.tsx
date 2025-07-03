'use client';

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, } from '../ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/use-products';

export const ProductFiltersDrawer = () => {
  const { form, onSubmit, onClear } = useProducts();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
            <SheetTitle>Filtros de productos</SheetTitle>
        </SheetHeader>
        
        <form
          onSubmit={onSubmit}
          className="space-y-4 mt-6"
        >
          <div className="space-y-1">
            <label className="text-sm font-medium">Buscar</label>
            <Input
              {...form.register('search')}
              placeholder="Buscar producto..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Categoría</label>
            <Input
              {...form.register('category')}
              placeholder="Ej: accesorios"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Marca</label>
            <Input
              {...form.register('brand')}
              placeholder="Ej: logitech"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium">Precio Mín</label>
              <Input type="number" {...form.register('minPrice')} />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Precio Máx</label>
              <Input type="number" {...form.register('maxPrice')} />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button type="submit">Aplicar</Button>
            <Button variant="ghost" type="button" onClick={onClear}>
              Limpiar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
