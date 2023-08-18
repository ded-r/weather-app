import {useState} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import {apiOptions, citiesApiUrl} from "../../services/API";

export default function Search({onSearchChange}) {
    const [search, setSearch] = useState(null);
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        return fetch(`${citiesApiUrl}/cities?&limit=10&namePrefix=${inputValue}`, apiOptions)
            .then((response) => response.json())
            .then((responce) => {
                return {
                    options: responce.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`, label: `${city.name}, ${city.country}`
                        }
                    })
                }
            }).catch(error => {
                console.log(error)
                window.location.reload();
            });
    }

    return (<>
        <div className="flex items-center align-middle justify-center lg:h-2/3">
            <div className="w-4/5 mx-auto">
                <AsyncPaginate
                    loadOptions={loadOptions}
                    placeholder="Enter city name"
                    debounceTimeout={600}
                    value={search}
                    onChange={handleOnChange}
                />
            </div>
        </div>
    </>)
}