import { useEffect, useState } from "react";

//UI
import { ColumnActionsMode, IColumn, Panel, PanelType, SelectionMode, ShimmeredDetailsList, Stack, Text, TextField } from "@fluentui/react";

//API
import { createBrand, deleteBrand, listBrands, updateBrand } from "../../services/server";

//TYPES
import { IBrand } from "@typesCustom";


import { DetailsListOptions } from "../../components/DetailsListOptions";
import { PanelFooterContent } from "../../components/PanelFooterContent";
import { PageToolBar } from "../../components/PageToolBar";
import { MessageBarCustom } from "../../components/MessageBarCustom";


export function BrandPage() {

    //Entity
    const [brand, setBrand] = useState<IBrand>({} as IBrand);
    const [brands, setBrands] = useState<IBrand[]>([]);

    //States Messages
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');

    //State - Loading
    const [loading, setLoading] = useState(true);

    //Open/Close
    const [openPanel, setOpenPanel] = useState(false);

    //Columns
    const columns: IColumn[] = [
        {
            key: 'name', 
            name: 'Nome da Marca', 
            fieldName: 'name', 
            minWidth: 100, 
            isResizable: false,
            columnActionsMode:  ColumnActionsMode.disabled
        },
        { 
            key: 'option', 
            name: 'Opções', 
            minWidth: 60, 
            maxWidth: 60, 
            isResizable: false,
            columnActionsMode:  ColumnActionsMode.disabled,
            onRender: (item: IBrand) => (
                <DetailsListOptions
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item)} />
            )
        },
    ];

    useEffect(() => {

        listBrands()
            .then(result => {
                setBrands(result.data);
            })
            .catch(error => {
                setMessageError(error.message);
                setInterval(() => {
                    setMessageError('');
                }, 10000);
            })
            .finally(() => {
                setLoading(false)
            });

    }, []);

    const onRenderFooterContent = (): JSX.Element => {
        return (
            <PanelFooterContent 
                id={brand.id as number}
                loading={loading}
                onConfirm={handleConfirmSave}
                onDismiss={() => setOpenPanel(false)} />
        );
    }

    function handleDemissMessageBar() {
        setMessageError('');
        setMessageSuccess('');
    }
    
    function handleNew() {
        setBrand({
            name: ''
        });
        setOpenPanel(true);
    }
    function handleEdit(item: IBrand) {
        setBrand(item);
        setOpenPanel(true);
    }
    function handleDelete(brand: IBrand) {
        setLoading(true);
        
        deleteBrand(Number(brand.id))
            .then(() => {
                const filteredTasks = brands.filter(itemFilter => itemFilter.id !== brand.id);
                setBrands([...filteredTasks])
                setMessageSuccess('Registro excluído com sucesso');
                setInterval(() => {
                    setMessageSuccess('');
                }, 5000);
            })
            .catch(error => {
                setMessageError(error.message);
                setInterval(() => {
                    setMessageError('');
                }, 10000);
            })
            .finally(() => {
                setLoading(false);
            });  
    }
    function handleConfirmSave() {
        let result = null;

        if (brand.id) {
            result = updateBrand(brand)
        } else {
            result = createBrand(brand)
        }

        result.then(result => {
            const filteredTasks = brands.filter(itemFilter => itemFilter.id !== brand.id);
            setBrands([...filteredTasks, result.data])
            setMessageSuccess('Registro salvo com sucesso');
            setInterval(() => {
                setMessageSuccess('');
            }, 5000);
        })
        .catch(error => {
            setMessageError(error.message);
            setInterval(() => {
                setMessageError('');
            }, 10000);
        })
        .finally(() => {
            setOpenPanel(false);
            setLoading(false);
        })
    }

    return (
        <div id="brand-page" className="main-content">
            <Stack horizontal={false} tokens={{childrenGap: 0}}>
                <PageToolBar
                    currentPageTitle="Marcas"
                    loading={loading}
                    onNew={handleNew} />

                <MessageBarCustom 
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    onDismiss={() => handleDemissMessageBar()} />
                
                <div className="data-list">
                    <ShimmeredDetailsList
                        items={brands.sort((a, b) => (a.name > b.name ? 1 : -1))}
                        columns={columns}
                        setKey="set"
                        enableShimmer={loading}
                        selectionMode={SelectionMode.none} />
                    
                        {brands.length == 0 && (
                            <div className="data-not-found">
                                <Text variant="large">Nenhum registro para ser exibido!</Text>
                            </div>
                        )}
                </div>
                
            </Stack>

            <Panel
                className="panel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de Marca"
                onDismiss={() => setOpenPanel(false)}
                isFooterAtBottom={true}
                onRenderFooterContent={onRenderFooterContent}>

                <p>Preencha TODOS os campos obrigatórios identificados por <span className="required">*</span></p>

                <Stack horizontal={false} className="panel-form-content">
                
                    <TextField label="Nome da marca"
                        required
                        value={brand.name}
                        onChange={event => setBrand({ ...brand, name: (event.target as HTMLInputElement).value })} />

                </Stack>

            </Panel>
        </div>
    )
}