import {employeeProductionService} from "@/services/employee-production.service";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import type {EmployeeProductionRequest, EmployeeProductionResponse} from "@/types/employee-product.type";

export const useEmployeeProductionsByEmployee = (employeeId: number) => {
  return useQuery<EmployeeProductionResponse[]>({
    queryKey: ["employee-productions", employeeId],
    queryFn: () => employeeProductionService.getByEmployee(employeeId),
    enabled: !!employeeId,
  });
};
  export const useAddEmployeeProduction = () =>{
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: Partial<EmployeeProductionRequest>) => employeeProductionService.addProductionRecord(data),
      onSuccess: () =>{
        queryClient.invalidateQueries({queryKey: ["employee-productions"]});
        alert("Production record added successfully.");
      }
    })
  };

export const useUpdateEmployeeProduction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn : ({id, data}: {id: number; data: Partial<EmployeeProductionRequest>}) => employeeProductionService.updateProductionRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["employee-productions"]});
      alert("Production record updated successfully.");
    }
  })
};
